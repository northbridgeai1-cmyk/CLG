/* ==========================================================================
   CLG — attribution and conversion tracking
   --------------------------------------------------------------------------
   WHY THIS EXISTS
   A landing page is judged on conversion rate. Without this file there is no
   way to answer "did the ad work", "which country converts", or "how many
   people started the Brújula and never finished". The firm's own strategy
   doc says it can't currently answer "where did this client come from".
   This is where that gets fixed.

   WHAT IT DOES, WITH NO THIRD PARTY REQUIRED
   1. Captures UTM parameters on first landing and keeps them for 90 days,
      so a lead that converts three weeks later is still credited correctly.
   2. Records the first page seen and the referrer.
   3. Fires named events at each funnel step.
   4. Attaches all of it to the WhatsApp handoff message, so the team can see
      the source of a lead even before any CRM is connected.

   TO SWITCH ON A REAL ANALYTICS TOOL
   Paste the ID into CLG_ANALYTICS below. Until then everything is stored
   locally and passed through WhatsApp, which is better than nothing and
   costs no privacy.
   ========================================================================== */

window.CLG_ANALYTICS = {
  /* TODO(CLG): paste your GA4 measurement ID, e.g. "G-XXXXXXXXXX".
     Leave empty and no Google script loads at all. */
  ga4: "",

  /* TODO(CLG): Meta pixel ID if the firm runs Facebook or Instagram ads.
     Leave empty and no pixel loads. Note for the privacy policy: a pixel
     shares visitor data with Meta, which for a law firm's site is worth a
     deliberate decision rather than a default. */
  metaPixel: "",

  attributionDays: 90
};

(function () {
  var A = window.CLG_ANALYTICS;
  var KEY = "clg_attribution";
  var UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "gclid", "fbclid"];

  /* ---------- 1. Capture attribution on first landing ---------- */
  function readStored() {
    try {
      var raw = localStorage.getItem(KEY);
      if (!raw) return null;
      var d = JSON.parse(raw);
      var ageDays = (Date.now() - d.ts) / 86400000;
      if (ageDays > A.attributionDays) return null;
      return d;
    } catch (e) { return null; }
  }

  function captureAttribution() {
    var params = new URLSearchParams(window.location.search);
    var found = {};
    var hasUtm = false;
    UTM_KEYS.forEach(function (k) {
      var v = params.get(k);
      if (v) { found[k] = v; hasUtm = true; }
    });

    var existing = readStored();

    /* First touch wins. If someone arrives from an ad, browses away and
       comes back directly, the ad still gets the credit. Overwrite only
       when a NEW campaign brings them back. */
    if (existing && !hasUtm) return existing;

    var record = {
      ts: Date.now(),
      utm: found,
      landing: window.location.pathname,
      referrer: document.referrer || "direct",
      lang: /\/en\//.test(window.location.pathname) ? "en" : "es"
    };
    try { localStorage.setItem(KEY, JSON.stringify(record)); } catch (e) {}
    return record;
  }

  var attribution = captureAttribution();

  /* ---------- 2. Event log ---------- */
  function log(name, detail) {
    var evt = { event: name, at: new Date().toISOString(), page: window.location.pathname };
    if (detail) evt.detail = detail;
    try {
      var trail = JSON.parse(localStorage.getItem("clg_events") || "[]");
      trail.push(evt);
      /* Keep it bounded. Nobody needs the full history in localStorage. */
      if (trail.length > 60) trail = trail.slice(-60);
      localStorage.setItem("clg_events", JSON.stringify(trail));
    } catch (e) {}

    if (window.gtag) window.gtag("event", name, detail || {});
    if (window.fbq) window.fbq("trackCustom", name, detail || {});
  }

  /* ---------- 3. Public helpers ---------- */
  window.CLGTrack = {
    event: log,
    attribution: function () { return attribution; },

    /* A readable one-liner to append to a WhatsApp message so the team can
       see where a lead came from without opening any dashboard. */
    sourceLine: function () {
      if (!attribution) return "";
      var u = attribution.utm || {};
      var bits = [];
      if (u.utm_source) bits.push("source: " + u.utm_source);
      if (u.utm_campaign) bits.push("campaign: " + u.utm_campaign);
      if (!bits.length && attribution.referrer && attribution.referrer !== "direct") {
        try { bits.push("came from: " + new URL(attribution.referrer).hostname); }
        catch (e) { bits.push("came from: " + attribution.referrer); }
      }
      if (!bits.length) bits.push("direct visit");
      return "\n---\n" + bits.join(" · ");
    }
  };

  /* ---------- 4. Automatic funnel events ---------- */
  document.addEventListener("DOMContentLoaded", function () {
    log("page_view", { lang: attribution ? attribution.lang : "es" });

    /* Every WhatsApp handoff carries its source with it. This is the part
       that works today, with no CRM and no analytics account. */
    document.querySelectorAll("[data-wa-link]").forEach(function (el) {
      el.addEventListener("click", function () {
        log("whatsapp_click", { from: window.location.pathname });
      });
      var href = el.getAttribute("href") || "";
      if (href.indexOf("api.whatsapp.com") !== -1) {
        el.setAttribute("href", href + encodeURIComponent(window.CLGTrack.sourceLine()));
      }
    });

    /* The paid step. This is the event that matters most. */
    document.querySelectorAll('a[href*="fase1"], a[href*="strategy-assessment"]').forEach(function (el) {
      el.addEventListener("click", function () { log("assessment_cta_click"); });
    });

    document.querySelectorAll('a[href*="evaluacion"], a[href*="compass"]').forEach(function (el) {
      el.addEventListener("click", function () { log("compass_cta_click"); });
    });
  });

  /* ---------- 5. Load third-party tags only if configured ---------- */
  if (A.ga4) {
    var s = document.createElement("script");
    s.async = true;
    s.src = "https://www.googletagmanager.com/gtag/js?id=" + A.ga4;
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag("js", new Date());
    window.gtag("config", A.ga4, { anonymize_ip: true });
  }

  if (A.metaPixel) {
    /* eslint-disable */
    !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
    n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}
    (window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
    window.fbq('init', A.metaPixel);
    window.fbq('track', 'PageView');
    /* eslint-enable */
  }
})();
