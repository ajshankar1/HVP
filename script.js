/* =========================================================
   HOTEL VISHAKA PAARK — MAIN WEBSITE JAVASCRIPT
   Production Website
   ========================================================= */

(function () {
  "use strict";

  /* =========================================================
     HOTEL DATA
     ========================================================= */

  var HOTEL = {
    name: "Hotel Vishaka Paark",
    phone: "+91 90909 27979",
    landline: "0422 4695952",
    email: "hotelvishakapaark@gmail.com",
    address: "Thudiyalur Road, Saravanampatty, Coimbatore – 641 035",
    rooms: 24,
    established: "5 September 2025",
    whatsapp: "919090927979"
  };

  var ROOM_RATES = {
    "Deluxe Triple Room": "₹4,500 incl. GST",
    "Executive Double": "₹3,000 incl. GST",
    "Executive Twin": "₹3,300 incl. GST"
  };

  var ROOM_NIGHTLY_RATES = {
    "Deluxe Triple Room": 4500,
    "Executive Double": 3000,
    "Executive Twin": 3300
  };

  /* =========================================================
     DOM HELPERS
     ========================================================= */

  function $(selector, parent) {
    var root = parent || document;
    return root.querySelector(selector);
  }

  function $$(selector, parent) {
    var root = parent || document;

    return Array.prototype.slice.call(
      root.querySelectorAll(selector)
    );
  }

  function cleanText(value) {
    return String(value || "")
      .replace(/\s+/g, " ")
      .trim();
  }

  /* =========================================================
     PAGE LOADER
     ========================================================= */

  function hidePageLoader() {
    var loader = $(".page-loader");

    document.body.classList.add("page-loaded");

    if (!loader) {
      return;
    }

    loader.classList.add("is-hidden");

    window.setTimeout(function () {
      if (loader && loader.parentNode) {
        loader.parentNode.removeChild(loader);
      }
    }, 700);
  }

  /*
   * Hide the loader when the page is completely loaded.
   * The timeout is a safety fallback so the website
   * never remains stuck on the loading screen.
   */

  window.addEventListener("load", hidePageLoader);

  window.setTimeout(hidePageLoader, 1800);

  /* =========================================================
     CURRENT YEAR
     ========================================================= */

  $$("[data-current-year]").forEach(function (element) {
    element.textContent =
      String(new Date().getFullYear());
  });

  /* =========================================================
     HEADER / MOBILE NAVIGATION
     ========================================================= */

  var menuToggle =
    $("[data-menu-toggle]");

  var nav =
    $(".site-nav");

  var header =
    $(".site-header");

  function closeNavigation() {
    if (!menuToggle || !nav) {
      return;
    }

    menuToggle.setAttribute(
      "aria-expanded",
      "false"
    );

    nav.classList.remove(
      "is-open"
    );

    document.body.classList.remove(
      "nav-open"
    );
  }

  function openNavigation() {
    if (!menuToggle || !nav) {
      return;
    }

    menuToggle.setAttribute(
      "aria-expanded",
      "true"
    );

    nav.classList.add(
      "is-open"
    );

    document.body.classList.add(
      "nav-open"
    );
  }

  if (menuToggle && nav) {
    menuToggle.addEventListener(
      "click",
      function () {
        var isOpen =
          menuToggle.getAttribute(
            "aria-expanded"
          ) === "true";

        if (isOpen) {
          closeNavigation();
        } else {
          openNavigation();
        }
      }
    );

    $$(".site-nav a").forEach(
      function (link) {
        link.addEventListener(
          "click",
          closeNavigation
        );
      }
    );

    document.addEventListener(
      "keydown",
      function (event) {
        if (event.key === "Escape") {
          closeNavigation();
        }
      }
    );

    document.addEventListener(
      "click",
      function (event) {
        if (
          !nav.classList.contains(
            "is-open"
          )
        ) {
          return;
        }

        var target =
          event.target;

        if (
          target instanceof Node &&
          !nav.contains(target) &&
          !menuToggle.contains(target)
        ) {
          closeNavigation();
        }
      }
    );
  }

  /* =========================================================
     HEADER SCROLL STATE
     ========================================================= */

  function updateHeaderState() {
    if (!header) {
      return;
    }

    if (window.scrollY > 20) {
      header.classList.add(
        "is-scrolled"
      );
    } else {
      header.classList.remove(
        "is-scrolled"
      );
    }
  }

  updateHeaderState();

  window.addEventListener(
    "scroll",
    updateHeaderState,
    {
      passive: true
    }
  );

  /* =========================================================
     SMOOTH ANCHOR SCROLL
     ========================================================= */

  $$('a[href^="#"]').forEach(
    function (link) {
      link.addEventListener(
        "click",
        function (event) {
          var href =
            link.getAttribute(
              "href"
            );

          if (
            !href ||
            href === "#"
          ) {
            return;
          }

          var target =
            document.querySelector(
              href
            );

          if (!target) {
            return;
          }

          event.preventDefault();

          var headerHeight =
            header
              ? header.getBoundingClientRect()
                  .height
              : 0;

          var targetTop =
            target.getBoundingClientRect()
              .top +
            window.scrollY -
            headerHeight -
            12;

          window.scrollTo({
            top: Math.max(
              0,
              targetTop
            ),
            behavior: "smooth"
          });
        }
      );
    }
  );

  /* =========================================================
     BOOKING FORM
     ========================================================= */

  var bookingForm =
    $("#booking-form");

  function getFieldValue(
    selector
  ) {
    if (!bookingForm) {
      return "";
    }

    var field =
      $(selector, bookingForm);

    return field
      ? cleanText(field.value)
      : "";
  }

  function formatDateForGuest(
    value
  ) {
    if (!value) {
      return "";
    }

    var date =
      new Date(
        value + "T00:00:00"
      );

    if (
      Number.isNaN(
        date.getTime()
      )
    ) {
      return value;
    }

    return new Intl.DateTimeFormat(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric"
      }
    ).format(date);
  }

  function buildBookingMessage() {
    var checkIn =
      getFieldValue(
        '[name="checkin"]'
      );

    var checkOut =
      getFieldValue(
        '[name="checkout"]'
      );

    var guests =
      getFieldValue(
        '[name="guests"]'
      );

    var room =
      getFieldValue(
        '[name="room"]'
      );

    var lines = [
      "Hello Hotel Vishaka Paark,",
      "",
      "I would like to enquire about a stay.",
      "",
      checkIn
        ? "Check-in: " +
          formatDateForGuest(
            checkIn
          )
        : "",

      checkOut
        ? "Check-out: " +
          formatDateForGuest(
            checkOut
          )
        : "",

      guests
        ? "Guests: " + guests
        : "",

      room
        ? "Room: " + room
        : "",

      room &&
      ROOM_RATES[room]
        ? "Published rate: " +
          ROOM_RATES[room]
        : "",

      "",
      "Please confirm availability and booking details."
    ];

    return lines
      .filter(function (line) {
        return Boolean(line);
      })
      .join("\n");
  }

  function openWhatsApp(
    message
  ) {
    var encoded =
      encodeURIComponent(
        message || ""
      );

    var url =
      "https://wa.me/" +
      HOTEL.whatsapp +
      "?text=" +
      encoded;

    window.open(
      url,
      "_blank",
      "noopener,noreferrer"
    );
  }

  if (bookingForm) {
    var checkInInput =
      $(
        '[name="checkin"]',
        bookingForm
      );

    var checkOutInput =
      $(
        '[name="checkout"]',
        bookingForm
      );

    if (checkInInput) {
      var today =
        new Date();

      var yyyy =
        today.getFullYear();

      var mm =
        String(
          today.getMonth() + 1
        ).padStart(2, "0");

      var dd =
        String(
          today.getDate()
        ).padStart(2, "0");

      checkInInput.min =
        yyyy +
        "-" +
        mm +
        "-" +
        dd;
    }

    if (
      checkInInput &&
      checkOutInput
    ) {
      checkInInput.addEventListener(
        "change",
        function () {
          if (
            !checkInInput.value
          ) {
            return;
          }

          checkOutInput.min =
            checkInInput.value;

          if (
            checkOutInput.value &&
            checkOutInput.value <
              checkInInput.value
          ) {
            checkOutInput.value =
              "";
          }
        }
      );
    }

    bookingForm.addEventListener(
      "submit",
      function (event) {
        event.preventDefault();

        openWhatsApp(
          buildBookingMessage()
        );
      }
    );
  }

  /* =========================================================
     ROOM RATE DISPLAY
     ========================================================= */

  $$("[data-room-rate]").forEach(
    function (element) {
      var roomName =
        cleanText(
          element.getAttribute(
            "data-room-rate"
          )
        );

      if (
        ROOM_RATES[roomName]
      ) {
        element.textContent =
          ROOM_RATES[roomName];
      }
    }
  );

  /* =========================================================
     ROOM BOOK BUTTONS
     ========================================================= */

  $$("[data-book-room]").forEach(
    function (button) {
      button.addEventListener(
        "click",
        function () {
          var room =
            cleanText(
              button.getAttribute(
                "data-book-room"
              )
            );

          if (bookingForm) {
            var bookingRoom =
              $(
                '[name="room"]',
                bookingForm
              );

            if (
              bookingRoom &&
              room
            ) {
              bookingRoom.value =
                room;
            }

            bookingForm.scrollIntoView(
              {
                behavior: "smooth",
                block: "center"
              }
            );
          } else {
            openWhatsApp(
              "Hello Hotel Vishaka Paark,\n\n" +
              "I would like to enquire about the " +
              room +
              ".\n\n" +
              "Please confirm availability and booking details."
            );
          }
        }
      );
    }
  );

  /* =========================================================
     ASK VISHAKA / CONCIERGE
     ========================================================= */

  var conciergeModal =
    $(".concierge-modal");

  var conciergeInput =
    $(
      '.concierge-form input[type="text"]'
    );

  var conciergeChat =
    $(".concierge-chat");

  var conciergeForm =
    $(".concierge-form");

  var openConciergeButtons =
    $$(
      "[data-open-concierge], .concierge-open"
    );

  var closeConciergeButton =
    $(".concierge-close");

  var conciergeBackdrop =
    $(".concierge-backdrop");

  var lastFocusedElement =
    null;

  function setConciergeState(
    open
  ) {
    if (!conciergeModal) {
      return;
    }

    conciergeModal.classList.toggle(
      "is-open",
      open
    );

    conciergeModal.setAttribute(
      "aria-hidden",
      open ? "false" : "true"
    );

    document.body.classList.toggle(
      "concierge-active",
      open
    );

    if (open) {
      lastFocusedElement =
        document.activeElement instanceof
        HTMLElement
          ? document.activeElement
          : null;

      window.setTimeout(
        function () {
          if (conciergeInput) {
            conciergeInput.focus();
          }
        },
        100
      );
    } else if (
      lastFocusedElement
    ) {
      lastFocusedElement.focus();
    }
  }

  function openConcierge() {
    setConciergeState(true);
  }

  function closeConcierge() {
    setConciergeState(false);
  }

  openConciergeButtons.forEach(
    function (button) {
      button.addEventListener(
        "click",
        openConcierge
      );
    }
  );

  if (
    closeConciergeButton
  ) {
    closeConciergeButton.addEventListener(
      "click",
      closeConcierge
    );
  }

  if (conciergeBackdrop) {
    conciergeBackdrop.addEventListener(
      "click",
      closeConcierge
    );
  }

  document.addEventListener(
    "keydown",
    function (event) {
      if (
        event.key === "Escape" &&
        conciergeModal &&
        conciergeModal.classList.contains(
          "is-open"
        )
      ) {
        closeConcierge();
      }
    }
  );

  /* =========================================================
     CONCIERGE ANSWER ENGINE
     ========================================================= */

  /*
   * Ask Vishaka is intentionally kept as a lightweight,
   * client-side concierge for the current website demo.
   *
   * Conversation principles:
   * - Natural greetings and small talk are welcome.
   * - A guest's name is remembered during the current chat.
   * - Names are capitalised correctly and used sparingly.
   * - One message can contain more than one topic.
   * - Follow-up questions can use the previous conversation.
   * - Short replies such as "yes", "okay" and "no" are understood
   *   when Vishaka has just asked a related question.
   * - Relevant hotel / Coimbatore questions get relevant answers.
   * - Unknown hotel details are never invented.
   * - Unrelated questions are politely declined and redirected.
   *
   * A true generative AI backend can later replace
   * getConciergeAnswer() while keeping this personality.
   */

  var conciergeGuestName = "";
  var conciergeLastTopic = "";
  var conciergePendingAction = "";
  var conciergeNameUses = 0;
  var conciergeConversationTurn = 0;

  var conciergeAnswers = [
    {
      topic: "rooms",
      keywords: [
        "room",
        "rooms",
        "stay",
        "accommodation",
        "hotel room",
        "which room",
        "room option",
        "room options"
      ],
      answer:
        "Hotel Vishaka Paark has 24 rooms. " +
        "We offer Deluxe Triple Room, Executive Double and Executive Twin " +
        "room options."
    },

    {
      topic: "deluxe",
      keywords: [
        "deluxe triple",
        "deluxe",
        "triple room",
        "triple"
      ],
      answer:
        "The Deluxe Triple Room is ₹4,500 incl. GST."
    },

    {
      topic: "executive-double",
      keywords: [
        "executive double",
        "double room",
        "executive double room"
      ],
      answer:
        "The Executive Double room is ₹3,000 incl. GST."
    },

    {
      topic: "executive-twin",
      keywords: [
        "executive twin",
        "twin room",
        "executive twin room"
      ],
      answer:
        "The Executive Twin room is ₹3,300 incl. GST."
    },

    {
      topic: "pricing",
      keywords: [
        "price",
        "pricing",
        "rate",
        "rates",
        "cost",
        "tariff",
        "room price",
        "room rate",
        "how much",
        "how much is"
      ],
      answer:
        "Our published room rates incl. GST are: " +
        "Deluxe Triple Room ₹4,500, Executive Double ₹3,000, " +
        "and Executive Twin ₹3,300."
    },

    {
      topic: "check-in-out",
      keywords: [
        "check in",
        "check-in",
        "checkin",
        "check out",
        "check-out",
        "checkout",
        "arrival time",
        "departure time",
        "late arrival",
        "late check in",
        "late check-in"
      ],
      answer:
        "Yes, Hotel Vishaka Paark offers 24-hour check-in and 24-hour " +
        "check-out facility. If you have a specific arrival or departure " +
        "request, our reception team can assist you."
    },

    {
      topic: "early-late",
      keywords: [
        "early check in",
        "early check-in",
        "late check out",
        "late check-out",
        "early arrival",
        "late departure"
      ],
      answer:
        "We offer 24-hour check-in and check-out facility. For any specific " +
        "early-arrival or late-departure request, our reception team can " +
        "confirm the arrangements for your stay."
    },

    {
      topic: "breakfast",
      keywords: [
        "breakfast",
        "morning meal",
        "breakfast included",
        "is breakfast included"
      ],
      answer:
        "Yes, breakfast is included with the stay. For the current breakfast " +
        "timing and details, our reception team can confirm the day's information."
    },

    {
      topic: "wifi",
      keywords: [
        "wifi",
        "wi-fi",
        "internet",
        "wireless"
      ],
      answer:
        "Yes, guest Wi-Fi is available at Hotel Vishaka Paark."
    },

    {
      topic: "laundry",
      keywords: [
        "laundry",
        "washing",
        "clothes"
      ],
      answer:
        "Yes, laundry service is available for hotel guests."
    },

    {
      topic: "room-service",
      keywords: [
        "room service",
        "in room service",
        "in-room service"
      ],
      answer:
        "Yes, room service is available during your stay."
    },

    {
      topic: "travel-desk",
      keywords: [
        "travel desk",
        "travel assistance",
        "transport",
        "taxi",
        "cab",
        "airport transfer",
        "car"
      ],
      answer:
        "Hotel Vishaka Paark has a travel desk to assist guests with " +
        "travel-related requirements. For current taxi, cab or transport " +
        "assistance, our reception team can help you."
    },

    {
      topic: "kettle",
      keywords: [
        "kettle",
        "tea",
        "coffee",
        "boiling water"
      ],
      answer:
        "Rooms include an in-room kettle for everyday convenience."
    },

    {
      topic: "power",
      keywords: [
        "power",
        "backup",
        "genset",
        "electricity",
        "power cut"
      ],
      answer:
        "The hotel has 24-hour genset / power backup."
    },

    {
      topic: "address",
      keywords: [
        "address",
        "location",
        "where are you",
        "where is the hotel",
        "where is hotel",
        "located",
        "saravanampatty",
        "saravanampatti"
      ],
      answer:
        "Hotel Vishaka Paark is at " +
        HOTEL.address +
        "."
    },

    {
      topic: "contact",
      keywords: [
        "phone",
        "telephone",
        "call",
        "contact",
        "number",
        "mobile"
      ],
      answer:
        "You can contact Hotel Vishaka Paark at " +
        HOTEL.phone +
        " or " +
        HOTEL.landline +
        "."
    },

    {
      topic: "email",
      keywords: [
        "email",
        "mail",
        "email address"
      ],
      answer:
        "The hotel email address is " +
        HOTEL.email +
        "."
    },

    {
      topic: "established",
      keywords: [
        "established",
        "opened",
        "opening",
        "new hotel",
        "when did the hotel open"
      ],
      answer:
        "Hotel Vishaka Paark was established on " +
        HOTEL.established +
        "."
    },

    {
      topic: "coimbatore",
      keywords: [
        "coimbatore",
        "kovai"
      ],
      answer:
        "Hotel Vishaka Paark is located in Saravanampatty, Coimbatore. " +
        "I can also help with places to visit, local areas, transport, " +
        "shopping, food and sightseeing around Coimbatore."
    },

    {
      topic: "airport",
      keywords: [
        "airport",
        "coimbatore airport",
        "international airport"
      ],
      answer:
        "Coimbatore International Airport is the city's main airport. " +
        "If you need travel assistance from the hotel to the airport, " +
        "our reception or travel desk can help you."
    },

    {
      topic: "railway",
      keywords: [
        "railway station",
        "train station",
        "railway",
        "train"
      ],
      answer:
        "Coimbatore Junction is a major railway station serving the city. " +
        "For travel assistance from Hotel Vishaka Paark, our reception or " +
        "travel desk can help you."
    },

    {
      topic: "places",
      keywords: [
        "places to visit",
        "places to see",
        "sightseeing",
        "tourist places",
        "tourist attractions",
        "attractions",
        "visit in coimbatore",
        "what to see",
        "things to do",
        "where to go"
      ],
      answer:
        "Coimbatore has plenty to explore, from temples and museums to parks " +
        "and nearby nature destinations. Tell me what kind of place you prefer " +
        "and I can suggest suitable options."
    },

    {
      topic: "shopping",
      keywords: [
        "shopping",
        "shopping in coimbatore",
        "market",
        "markets",
        "where to shop"
      ],
      answer:
        "Coimbatore has a variety of shopping areas and local markets. " +
        "Tell me what you would like to shop for, and I can suggest the type " +
        "of area that may suit you."
    },

    {
      topic: "food",
      keywords: [
        "food in coimbatore",
        "food",
        "eat",
        "restaurants",
        "restaurant",
        "local food",
        "where to eat"
      ],
      answer:
        "Coimbatore offers a wide range of South Indian and other cuisines. " +
        "Hotel Vishaka Paark provides breakfast as part of the stay, " +
        "while for outside dining I can suggest general options based on " +
        "the type of food you are looking for."
    },

    {
      topic: "restaurant",
      keywords: [
        "hotel restaurant",
        "hotel dining",
        "dining facility",
        "restaurant facility",
        "do you have a restaurant",
        "is there a restaurant",
        "restaurant available"
      ],
      answer:
        "Our restaurant / dining facility is coming soon. We'll announce the " +
        "operational details when the facility is ready."
    },

    {
      topic: "permit",
      keywords: [
        "permit",
        "permits",
        "license",
        "licence",
        "restaurant approval",
        "restaurant approvals",
        "food permit",
        "food license",
        "food licence"
      ],
      answer:
        "The hotel's restaurant / dining facility is coming soon. Details about " +
        "the applicable approvals or permits will be announced when the facility " +
        "is ready. I don't want to give you unconfirmed information."
    },

    {
      topic: "weather",
      keywords: [
        "weather",
        "climate",
        "temperature",
        "how hot",
        "how is the weather"
      ],
      answer:
        "I can check the current Coimbatore weather for you."
    },

    {
      topic: "booking",
      keywords: [
        "book",
        "booking",
        "reserve",
        "reservation",
        "availability",
        "available room",
        "vacancy",
        "want a room",
        "need a room"
      ],
      answer:
        "I can help you with the room options and published rates. For live " +
        "availability and confirmed reservations, our reservation or reception " +
        "team will assist you further."
    },

    {
      topic: "booking-confirmation",
      keywords: [
        "confirm booking",
        "booking confirmation",
        "reservation confirmation",
        "confirm reservation"
      ],
      answer:
        "Booking confirmation and live availability need to be checked by our " +
        "reservation or reception team. They can confirm the details for you."
    },

    {
      topic: "offers",
      keywords: [
        "offer",
        "offers",
        "discount",
        "deal",
        "direct booking offer"
      ],
      answer:
        "For current direct-booking offers or special rates, please contact the " +
        "hotel directly. Our reservation team will confirm the applicable offer."
    },

    {
      topic: "ota",
      keywords: [
        "ota",
        "online travel agent",
        "booking.com",
        "makemytrip",
        "make my trip",
        "agoda",
        "cleartrip",
        "online booking"
      ],
      answer:
        "Hotel Vishaka Paark is available through platforms such as MakeMyTrip, " +
        "Booking.com, Agoda and Cleartrip. OTA availability and prices can change, " +
        "so please check the relevant listing before booking."
    }
  ];

  var conciergeTopicKeywords = [
    "hotel",
    "room",
    "rooms",
    "stay",
    "accommodation",
    "breakfast",
    "wifi",
    "wi-fi",
    "internet",
    "laundry",
    "washing",
    "room service",
    "travel",
    "transport",
    "taxi",
    "cab",
    "airport",
    "railway",
    "train",
    "coimbatore",
    "kovai",
    "saravanampatty",
    "saravanampatti",
    "check in",
    "check-in",
    "checkin",
    "check out",
    "check-out",
    "checkout",
    "price",
    "pricing",
    "rate",
    "rates",
    "cost",
    "tariff",
    "booking",
    "book",
    "reserve",
    "reservation",
    "availability",
    "vacancy",
    "offer",
    "offers",
    "discount",
    "contact",
    "phone",
    "email",
    "address",
    "location",
    "places to visit",
    "places to see",
    "sightseeing",
    "tourist",
    "attractions",
    "shopping",
    "market",
    "food",
    "restaurant",
    "restaurants",
    "weather",
    "climate",
    "temperature",
    "temple",
    "temples",
    "park",
    "parks",
    "museum",
    "museums",
    "kettle",
    "tea",
    "coffee",
    "power",
    "backup",
    "genset",
    "electricity",
    "established",
    "permit",
    "permits",
    "license",
    "licence"
  ];

  function isConciergeTopicQuestion(normalized) {
    return conciergeTopicKeywords.some(function (keyword) {
      return normalized.indexOf(keyword) !== -1;
    });
  }

  function formatGuestName(value) {
    return cleanText(value)
      .split(" ")
      .map(function (part) {
        if (!part) {
          return "";
        }

        return part.charAt(0).toUpperCase() +
          part.slice(1).toLowerCase();
      })
      .join(" ");
  }

  function extractGuestName(question) {
    var text = cleanText(question);
    var match = text.match(
      /(?:my name is|i am|i'm|this is|call me)\s+([a-zA-Z][a-zA-Z.'-]{1,30}(?:\s+[a-zA-Z][a-zA-Z.'-]{1,30})?)/i
    );

    if (!match) {
      return "";
    }

    var candidate = cleanText(match[1]).replace(
      /[.!?,;:]+$/,
      ""
    ).replace(
      /\s+(?:and|but|from|going|coming|looking)\b.*$/i,
      ""
    );

    var blocked = [
      "hotel",
      "vishaka",
      "visaka",
      "looking",
      "coming",
      "here",
      "interested",
      "travelling",
      "traveling",
      "from",
      "going"
    ];

    if (
      !candidate ||
      blocked.indexOf(candidate.toLowerCase()) !== -1
    ) {
      return "";
    }

    return formatGuestName(candidate);
  }

  function getNameGreeting() {
    return conciergeGuestName
      ? " " + conciergeGuestName + "!"
      : "";
  }

  function maybeAddressGuest(answer) {
    if (!conciergeGuestName) {
      return answer;
    }

    if (
      conciergeNameUses === 0 ||
      conciergeConversationTurn % 5 === 0
    ) {
      conciergeNameUses += 1;
      return conciergeGuestName + ", " + answer;
    }

    return answer;
  }

  function isGreeting(normalized) {
    return /^(hi|hello|hey|hiya|good morning|good afternoon|good evening|good night|morning|afternoon|evening)[!. ]*$/.test(
      normalized
    );
  }

  function getGreetingAnswer(normalized) {
    if (
      normalized.indexOf("good morning") === 0 ||
      normalized === "morning"
    ) {
      return "Good morning" + getNameGreeting() +
        " How can I help you today?";
    }

    if (
      normalized.indexOf("good afternoon") === 0 ||
      normalized === "afternoon"
    ) {
      return "Good afternoon" + getNameGreeting() +
        " How can I help you today?";
    }

    if (
      normalized.indexOf("good evening") === 0 ||
      normalized === "evening"
    ) {
      return "Good evening" + getNameGreeting() +
        " How can I help you today?";
    }

    if (normalized === "good night") {
      return "Good night" + getNameGreeting() +
        " If you need anything about your stay, I'm here.";
    }

    return "Hello" + getNameGreeting() +
      " What can I help you with?";
  }

  function isThanks(normalized) {
    return /^(thanks|thank you|thankyou|thx|many thanks|thanks a lot|thank you so much)[!. ]*$/.test(
      normalized
    );
  }

  function isFarewell(normalized) {
    return /^(bye|goodbye|good bye|see you|see you later|talk to you later)[!. ]*$/.test(
      normalized
    );
  }

  function isHowAreYou(normalized) {
    return (
      normalized.indexOf("how are you") !== -1 ||
      normalized.indexOf("how r u") !== -1 ||
      normalized === "how are things"
    );
  }

  function isPositiveReply(normalized) {
    return /^(yes|yeah|yep|yup|sure|certainly|okay|ok|alright|please|go ahead|tell me|of course)[!. ]*$/.test(
      normalized
    );
  }

  function isNegativeReply(normalized) {
    return /^(no|no thanks|not now|maybe later|not really|nope)[!. ]*$/.test(
      normalized
    );
  }

  function isNameIntroduction(normalized) {
    return (
      normalized.indexOf("my name is ") === 0 ||
      normalized.indexOf("i am ") === 0 ||
      normalized.indexOf("i'm ") === 0 ||
      normalized.indexOf("this is ") === 0 ||
      normalized.indexOf("call me ") === 0
    );
  }

  function findConciergeMatches(normalized) {
    var matches = conciergeAnswers.filter(function (entry) {
      return entry.keywords.some(function (keyword) {
        return normalized.indexOf(keyword) !== -1;
      });
    });

    matches.sort(function (a, b) {
      function score(entry) {
        return entry.keywords.reduce(function (total, keyword) {
          return normalized.indexOf(keyword) !== -1
            ? total + keyword.length
            : total;
        }, 0);
      }

      return score(b) - score(a);
    });

    var specificTopics = [
      "deluxe",
      "executive-double",
      "executive-twin",
      "room-service"
    ];

    if (
      matches.some(function (entry) {
        return specificTopics.indexOf(entry.topic) !== -1;
      })
    ) {
      matches = matches.filter(function (entry) {
        return (
          entry.topic !== "rooms" ||
          entry.topic === "room-service"
        );
      });
    }

    var seen = {};

    return matches.filter(function (entry) {
      if (seen[entry.topic]) {
        return false;
      }

      seen[entry.topic] = true;
      return true;
    }).slice(0, 3);
  }

  function findConciergeMatch(normalized) {
    return findConciergeMatches(normalized)[0] || null;
  }

  function findAnswerByTopic(topic) {
    return conciergeAnswers.find(function (entry) {
      return entry.topic === topic;
    }) || null;
  }

  function getContextualAnswer(normalized) {
    if (
      conciergeLastTopic === "rooms" &&
      (
        normalized.indexOf("price") !== -1 ||
        normalized.indexOf("cost") !== -1 ||
        normalized.indexOf("rate") !== -1 ||
        normalized.indexOf("how much") !== -1
      )
    ) {
      return findAnswerByTopic("pricing");
    }

    if (
      (
        conciergeLastTopic === "rooms" ||
        conciergeLastTopic === "deluxe" ||
        conciergeLastTopic === "executive-double" ||
        conciergeLastTopic === "executive-twin"
      ) &&
      (
        normalized.indexOf("breakfast") !== -1 ||
        normalized.indexOf("wifi") !== -1 ||
        normalized.indexOf("wi-fi") !== -1 ||
        normalized.indexOf("kettle") !== -1
      )
    ) {
      return findConciergeMatch(normalized);
    }

    if (
      conciergeLastTopic === "booking" &&
      (
        normalized.indexOf("confirm") !== -1 ||
        normalized.indexOf("confirmation") !== -1
      )
    ) {
      return findAnswerByTopic("booking-confirmation");
    }

    return null;
  }

  function getServicesAnswer() {
    return (
      "We offer breakfast included with the stay, Wi-Fi, room service, " +
      "laundry, a travel desk, an in-room kettle, 24-hour genset / power " +
      "backup and warm hospitality."
    );
  }

  function getPendingReply(normalized) {
    if (
      conciergePendingAction === "room-selection" &&
      /\b\d{1,2}\b/.test(normalized)
    ) {
      var guestCountMatch =
        normalized.match(/\b\d{1,2}\b/);

      var guestCount =
        guestCountMatch
          ? Number(guestCountMatch[0])
          : 0;

      conciergePendingAction = "";

      if (guestCount === 2) {
        return {
          topic: "room-selection",
          answer:
            "For two guests, the Executive Double at ₹3,000 incl. GST " +
            "and Executive Twin at ₹3,300 incl. GST are the relevant published options. " +
            "If you'd like, I can also guide you to the booking enquiry."
        };
      }

      if (guestCount === 3) {
        return {
          topic: "room-selection",
          answer:
            "For three guests, the Deluxe Triple Room is the relevant published option " +
            "at ₹4,500 incl. GST. If you'd like to book, I can guide you to the booking enquiry."
        };
      }

      return {
        topic: "room-selection",
        answer:
          "Thanks. I have noted the number of guests. I can help you with the published room options, " +
          "and the reservation team can confirm the best available arrangement."
      };
    }

    if (isPositiveReply(normalized)) {
      if (conciergePendingAction === "room-prices") {
        conciergePendingAction = "room-selection";

        return {
          topic: "pricing",
          answer:
            "Certainly. Our published rates incl. GST are: Deluxe Triple Room " +
            "₹4,500, Executive Double ₹3,000 and Executive Twin ₹3,300. " +
            "If you tell me which room you're considering, I can help you compare them."
        };
      }

      if (conciergePendingAction === "room-selection") {
        conciergePendingAction = "";

        return {
          topic: "room-selection",
          answer:
            "Of course. Tell me roughly how many guests will be staying, " +
            "and I can help you look at the published room options."
        };
      }

      if (conciergePendingAction === "arrival-details") {
        conciergePendingAction = "";

        return {
          topic: "check-in-out",
          answer:
            "Sure. Tell me your expected arrival or departure time, and " +
            "our reception team can guide you on the arrangement."
        };
      }

      if (conciergePendingAction === "service-detail") {
        conciergePendingAction = "";

        return {
          topic: "services",
          answer:
            "Of course. You can ask me about breakfast, Wi-Fi, room service, " +
            "laundry, the travel desk, the in-room kettle or power backup."
        };
      }

      if (conciergePendingAction === "general-help") {
        conciergePendingAction = "";

        return {
          topic: "general",
          answer:
            "Of course. Tell me what you have in mind — your room, stay, " +
            "arrival, or plans around Coimbatore."
        };
      }
    }

    if (
      isNegativeReply(normalized) &&
      conciergePendingAction
    ) {
      conciergePendingAction = "";

      return {
        topic: "general",
        answer:
          "No problem at all. What else would you like to know?"
      };
    }

    return null;
  }

  function getNaturalTopicAnswer(entry) {
    if (!entry) {
      return "";
    }

    if (entry.topic === "rooms") {
      conciergePendingAction = "room-prices";

      return entry.answer +
        " If you're choosing a room, I can also tell you the published rates.";
    }

    if (entry.topic === "pricing") {
      conciergePendingAction = "room-selection";

      return entry.answer +
        " If you tell me which room you're considering, I can help you compare them.";
    }

    if (
      entry.topic === "deluxe" ||
      entry.topic === "executive-double" ||
      entry.topic === "executive-twin"
    ) {
      conciergePendingAction = "room-selection";

      return entry.answer +
        " If you'd like, tell me how many guests you're travelling with and I can help you look at the options.";
    }

    if (
      entry.topic === "check-in-out" ||
      entry.topic === "early-late"
    ) {
      conciergePendingAction = "arrival-details";

      return entry.answer +
        " Are you asking about a particular arrival or departure time?";
    }

    if (entry.topic === "breakfast") {
      return entry.answer +
        " If you're planning your morning, I can also help with the other hotel services.";
    }

    if (entry.topic === "address") {
      return entry.answer +
        " If you're planning your arrival, I can also help with airport or railway information.";
    }

    if (
      entry.topic === "airport" ||
      entry.topic === "railway"
    ) {
      return entry.answer +
        " If you tell me how you're arriving, I can help with the next step.";
    }

    if (entry.topic === "places") {
      conciergeLastTopic = "places";

      return entry.answer +
        " What sort of place are you in the mood for — temples, museums, parks or nature?";
    }

    if (entry.topic === "shopping") {
      conciergeLastTopic = "shopping";

      return entry.answer +
        " Tell me what you'd like to shop for, and I'll help you narrow it down.";
    }

    if (entry.topic === "food") {
      return entry.answer +
        " If you're looking for food outside the hotel, tell me what kind of cuisine you prefer.";
    }

    if (entry.topic === "services") {
      conciergePendingAction = "service-detail";

      return getServicesAnswer() +
        " Is there a particular service you'd like to know more about?";
    }

    if (entry.topic === "booking") {
      return entry.answer +
        " If you already know your dates and preferred room, I can guide you to the next step.";
    }

    if (entry.topic === "offers") {
      return entry.answer +
        " The reservation team can confirm what applies for your dates.";
    }

    return entry.answer;
  }

  function composeConciergeAnswer(matches) {
    if (!matches.length) {
      return "";
    }

    if (matches.length === 1) {
      return getNaturalTopicAnswer(matches[0]);
    }

    conciergePendingAction = "";

    var parts = matches.map(function (entry) {
      if (entry.topic === "services") {
        return getServicesAnswer();
      }

      return entry.answer;
    });

    var lastTopic =
      matches[matches.length - 1].topic;

    if (lastTopic === "services") {
      conciergePendingAction = "service-detail";

      parts.push(
        "Is there a particular service you'd like to know more about?"
      );
    } else if (
      lastTopic === "rooms" ||
      lastTopic === "pricing"
    ) {
      conciergePendingAction = "room-prices";

      parts.push(
        "If you're choosing a room, I can also help you compare the published options."
      );
    } else {
      parts.push(
        "What would you like to know next?"
      );
    }

    return parts.join("\n\n");
  }

  function getConciergeAnswer(question) {
    var normalized =
      cleanText(question).toLowerCase();

    conciergeConversationTurn += 1;

    if (!normalized) {
      conciergePendingAction = "general-help";

      return (
        "Of course. What would you like to know about Hotel Vishaka Paark or Coimbatore?"
      );
    }

    var extractedName =
      extractGuestName(question);

    if (extractedName) {
      conciergeGuestName = extractedName;
      conciergeNameUses = 0;

      if (
        isNameIntroduction(normalized) ||
        /^(hi|hello|hey|hiya)\b/.test(normalized)
      ) {
        var remaining = normalized.replace(
          /(?:my name is|i am|i'm|this is|call me)\s+[a-zA-Z][a-zA-Z.'-]*(?:\s+[a-zA-Z][a-zA-Z.'-]*)?/i,
          ""
        ).trim();

        if (!isConciergeTopicQuestion(remaining)) {
          conciergePendingAction = "general-help";
          conciergeNameUses = 1;

          return (
            "Nice to know you, " +
            conciergeGuestName +
            ". What can I help you with today?"
          );
        }
      }
    }

    if (isGreeting(normalized)) {
      conciergePendingAction = "general-help";
      return getGreetingAnswer(normalized);
    }

    if (isThanks(normalized)) {
      conciergePendingAction = "";

      return (
        "You're very welcome" +
        getNameGreeting() +
        " I'm happy to help."
      );
    }

    if (isFarewell(normalized)) {
      conciergePendingAction = "";

      return (
        "You're very welcome" +
        getNameGreeting() +
        " Have a comfortable stay, and feel free to come back if you need anything."
      );
    }

    if (isHowAreYou(normalized)) {
      conciergePendingAction = "general-help";

      return (
        "I'm doing well, thank you" +
        getNameGreeting() +
        ". I'm here to help with your stay at Hotel Vishaka Paark or with Coimbatore."
      );
    }

    var pendingMatch =
      getPendingReply(normalized);

    if (pendingMatch) {
      conciergeLastTopic =
        pendingMatch.topic ||
        conciergeLastTopic;

      return pendingMatch.answer;
    }

    if (
      conciergeLastTopic === "places" &&
      (
        normalized.indexOf("temple") !== -1 ||
        normalized.indexOf("museum") !== -1 ||
        normalized.indexOf("park") !== -1 ||
        normalized.indexOf("nature") !== -1
      )
    ) {
      return (
        "Certainly. Tell me which of those interests you most, and I can help you narrow down the Coimbatore options."
      );
    }

    var contextualMatch =
      getContextualAnswer(normalized);

    var matches =
      findConciergeMatches(normalized);

    var wantsServices =
      normalized.indexOf("service") !== -1 ||
      normalized.indexOf("facility") !== -1 ||
      normalized.indexOf("facilities") !== -1 ||
      normalized.indexOf("amenities") !== -1;

    var wantsRooms =
      normalized.indexOf("room") !== -1 ||
      normalized.indexOf("rooms") !== -1 ||
      normalized.indexOf("accommodation") !== -1;

    if (
      wantsServices &&
      !(normalized.indexOf("room service") !== -1)
    ) {
      conciergeLastTopic = "services";

      if (wantsRooms) {
        conciergePendingAction = "room-prices";

        return maybeAddressGuest(
          "We have 24 rooms, with Deluxe Triple Room, Executive Double " +
          "and Executive Twin options.\n\n" +
          getServicesAnswer() +
          "\n\n" +
          "If you're choosing a room, I can also tell you the published rates."
        );
      }

      conciergePendingAction = "service-detail";

      return maybeAddressGuest(
        getServicesAnswer() +
        " Is there a particular service you'd like to know more about?"
      );
    }

    if (contextualMatch) {
      matches = [contextualMatch];
    }

    if (matches.length) {
      conciergeLastTopic =
        matches[
          matches.length - 1
        ].topic;

      return maybeAddressGuest(
        composeConciergeAnswer(matches)
      );
    }

    if (
      isConciergeTopicQuestion(normalized)
    ) {
      conciergePendingAction = "";

      return (
        "I can help with Hotel Vishaka Paark, your stay and Coimbatore-related information. " +
        "I don't want to guess at something that hasn't been confirmed. Is there another part of your stay you'd like to ask about?"
      );
    }

    conciergePendingAction = "";

    return (
      "I'm here to help with Hotel Vishaka Paark, your stay, or Coimbatore-related information. " +
      "I'm afraid I can't help with that topic, but I'd be happy to help with your hotel or travel plans."
    );
  }

  function getWeatherDescription(
    code
  ) {
    var descriptions = {
      0: "clear skies",
      1: "mostly clear skies",
      2: "partly cloudy skies",
      3: "overcast skies",
      45: "foggy conditions",
      48: "misty conditions",
      51: "light drizzle",
      53: "moderate drizzle",
      55: "heavy drizzle",
      61: "light rain",
      63: "moderate rain",
      65: "heavy rain",
      80: "rain showers",
      81: "moderate rain showers",
      82: "heavy rain showers",
      95: "a thunderstorm"
    };

    return (
      descriptions[code] ||
      "mixed conditions"
    );
  }

  function getLiveWeatherAnswer() {
    return fetch(
      "https://api.open-meteo.com/v1/forecast?latitude=11.0168&longitude=76.9558&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&timezone=Asia%2FKolkata"
    )
      .then(
        function (response) {
          if (!response.ok) {
            throw new Error(
              "Weather request failed"
            );
          }

          return response.json();
        }
      )
      .then(
        function (data) {
          var current =
            data.current ||
            {};

          var temperature =
            Math.round(
              current.temperature_2m
            );

          var humidity =
            Math.round(
              current.relative_humidity_2m
            );

          var wind =
            Math.round(
              current.wind_speed_10m
            );

          return (
            "Today's Coimbatore weather: " +
            temperature +
            "°C, " +
            getWeatherDescription(
              current.weather_code
            ) +
            ". Humidity is around " +
            humidity +
            "% and wind speed is about " +
            wind +
            " km/h. Weather can change, so please check again before travelling."
          );
        }
      )
      .catch(
        function () {
          return (
            "I couldn't fetch the live weather right now. Please check the current weather before travelling to Coimbatore."
          );
        }
      );
  }

  function appendChatMessage(
    message,
    type
  ) {
    if (!conciergeChat) {
      return;
    }

    var messageType =
      type || "assistant";

    var wrapper =
      document.createElement(
        "div"
      );

    wrapper.className =
      messageType === "user"
        ? "chat-message chat-message-user"
        : "chat-message";

    if (
      messageType ===
      "assistant"
    ) {
      var avatar =
        document.createElement(
          "div"
        );

      avatar.className =
        "chat-avatar";

      avatar.textContent =
        "V";

      wrapper.appendChild(
        avatar
      );
    }

    var bubble =
      document.createElement(
        "div"
      );

    bubble.className =
      "chat-bubble";

    bubble.textContent =
      String(
        message || ""
      );

    wrapper.appendChild(
      bubble
    );

    conciergeChat.appendChild(
      wrapper
    );

    conciergeChat.scrollTop =
      conciergeChat.scrollHeight;
  }

  function showConciergeTyping() {
    if (!conciergeChat) {
      return null;
    }

    var wrapper =
      document.createElement(
        "div"
      );

    wrapper.className =
      "chat-message concierge-typing-message";

    var avatar =
      document.createElement(
        "div"
      );

    avatar.className =
      "chat-avatar";

    avatar.textContent =
      "V";

    var bubble =
      document.createElement(
        "div"
      );

    bubble.className =
      "chat-bubble concierge-typing";

    bubble.textContent =
      "Just a moment…";

    wrapper.appendChild(
      avatar
    );

    wrapper.appendChild(
      bubble
    );

    conciergeChat.appendChild(
      wrapper
    );

    conciergeChat.scrollTop =
      conciergeChat.scrollHeight;

    return wrapper;
  }

  function handleConciergeQuestion(
    question
  ) {
    var cleaned =
      cleanText(
        question
      );

    if (!cleaned) {
      return;
    }

    appendChatMessage(
      cleaned,
      "user"
    );

    var typingMessage =
      showConciergeTyping();

    var normalizedQuestion =
      cleaned.toLowerCase();

    var answerPromise =
      normalizedQuestion.indexOf(
        "weather"
      ) !== -1 ||
      normalizedQuestion.indexOf(
        "temperature"
      ) !== -1 ||
      normalizedQuestion.indexOf(
        "climate"
      ) !== -1
        ? getLiveWeatherAnswer()
        : Promise.resolve(
            getConciergeAnswer(
              cleaned
            )
          );

    answerPromise.then(
      function (answer) {
        window.setTimeout(
          function () {
            if (typingMessage) {
              typingMessage.remove();
            }

            appendChatMessage(
              answer,
              "assistant"
            );
          },
          350
        );
      }
    );
  }

  if (conciergeForm) {
    conciergeForm.addEventListener(
      "submit",
      function (event) {
        event.preventDefault();

        if (!conciergeInput) {
          return;
        }

        var question =
          cleanText(
            conciergeInput.value
          );

        if (!question) {
          return;
        }

        conciergeInput.value =
          "";

        handleConciergeQuestion(
          question
        );
      }
    );
  }

  /* =========================================================
     CONCIERGE QUICK ACTIONS
     ========================================================= */

  var quickActionMap = {
    "room options":
      "What room options are available?",

    "pricing & offers":
      "What are your room prices?",

    "hotel services":
      "What services are available?",

    "coimbatore":
      "Where is Hotel Vishaka Paark located?"
  };

  $$(".concierge-quick-actions button")
    .forEach(
      function (button) {
        button.addEventListener(
          "click",
          function () {
            var label =
              cleanText(
                button.textContent
              ).toLowerCase();

            var question =
              quickActionMap[
                label
              ] ||
              cleanText(
                button.textContent
              );

            handleConciergeQuestion(
              question
            );
          }
        );
      }
    );

  /* =========================================================
     AI SECTION SUGGESTIONS
     ========================================================= */

  $$(".ai-suggestions button")
    .forEach(
      function (button) {
        button.addEventListener(
          "click",
          function () {
            var label =
              cleanText(
                button.textContent
              ).toLowerCase();

            var question;

            if (
              quickActionMap[
                label
              ]
            ) {
              question =
                quickActionMap[
                  label
                ];
            } else if (
              label.indexOf(
                "nearby"
              ) !== -1
            ) {
              question =
                "Where is Hotel Vishaka Paark located?";
            } else if (
              label.indexOf(
                "travel"
              ) !== -1
            ) {
              question =
                "What travel assistance is available?";
            } else if (
              label.indexOf(
                "weather"
              ) !== -1
            ) {
              question =
                "What is today's weather in Coimbatore?";
            } else if (
              label.indexOf(
                "ota"
              ) !== -1
            ) {
              question =
                "Which OTA booking options and direct offers are available?";
            } else {
              question =
                cleanText(
                  button.textContent
                );
            }

            openConcierge();

            handleConciergeQuestion(
              question
            );
          }
        );
      }
    );

  /* =========================================================
     WHATSAPP BUTTONS
     ========================================================= */

  $$("[data-whatsapp]")
    .forEach(
      function (button) {
        button.addEventListener(
          "click",
          function () {
            var customMessage =
              cleanText(
                button.getAttribute(
                  "data-whatsapp"
                )
              );

            var message =
              customMessage ||
              "Hello Hotel Vishaka Paark, " +
              "I would like to enquire about a stay.";

            openWhatsApp(
              message
            );
          }
        );
      }
    );

  /* =========================================================
     SCROLL REVEAL
     ========================================================= */

  var revealElements =
    $$(
      ".section-heading, " +
      ".room-card, " +
      ".room-card-featured, " +
      ".service-item, " +
      ".gallery-item, " +
      ".testimonial-card, " +
      ".location-card"
    );

  if (
    "IntersectionObserver" in
    window
  ) {
    var revealObserver =
      new IntersectionObserver(
        function (
          entries,
          observer
        ) {
          entries.forEach(
            function (entry) {
              if (
                !entry.isIntersecting
              ) {
                return;
              }

              entry.target.classList.add(
                "is-visible"
              );

              observer.unobserve(
                entry.target
              );
            }
          );
        },
        {
          threshold: 0.12,
          rootMargin:
            "0px 0px -40px 0px"
        }
      );

    revealElements.forEach(
      function (element) {
        element.classList.add(
          "reveal-on-scroll"
        );

        revealObserver.observe(
          element
        );
      }
    );
  } else {
    revealElements.forEach(
      function (element) {
        element.classList.add(
          "is-visible"
        );
      }
    );
  }

  /* =========================================================
     IMAGE ERROR HANDLING
     ========================================================= */

  $$("img").forEach(
    function (image) {
      image.addEventListener(
        "error",
        function () {
          image.classList.add(
            "image-load-error"
          );
        }
      );
    }
  );

  /* =========================================================
     FORM STATE ON PAGE RESTORE
     ========================================================= */

  window.addEventListener(
    "pageshow",
    function () {
      if (!bookingForm) {
        return;
      }

      var submitButton =
        bookingForm.querySelector(
          'button[type="submit"]'
        );

      if (submitButton) {
        submitButton.disabled =
          false;
      }
    }
  );

  /* =========================================================
     RESERVATION ENQUIRY MODAL
     ========================================================= */

  var reservationModal =
    $(".reservation-modal");

  var reservationForm =
    $(".reservation-form");

  var reservationSendOptions =
    $(".reservation-send-options");

  var reservationMessage =
    "";

  var reservationNights =
    $("[data-reservation-nights]");

  var reservationNightly =
    $("[data-reservation-nightly]");

  var reservationSubtotal =
    $("[data-reservation-subtotal]");

  var reservationTotal =
    $("[data-reservation-total]");

  function setReservationState(
    open
  ) {
    if (!reservationModal) {
      return;
    }

    reservationModal.classList.toggle(
      "is-open",
      open
    );

    reservationModal.setAttribute(
      "aria-hidden",
      open
        ? "false"
        : "true"
    );

    document.body.classList.toggle(
      "reservation-active",
      open
    );
  }

  function getReservationValue(
    name
  ) {
    var field =
      reservationForm
        ? $(
            '[name="' +
            name +
            '"]',
            reservationForm
          )
        : null;

    return field
      ? cleanText(
          field.value
        )
      : "";
  }

  function formatReservationCurrency(
    value
  ) {
    return new Intl.NumberFormat(
      "en-IN",
      {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0
      }
    ).format(value);
  }

  function getReservationNights() {
    var checkIn =
      getReservationValue(
        "checkin"
      );

    var checkOut =
      getReservationValue(
        "checkout"
      );

    if (
      !checkIn ||
      !checkOut
    ) {
      return 0;
    }

    var start =
      new Date(
        checkIn +
        "T00:00:00"
      );

    var end =
      new Date(
        checkOut +
        "T00:00:00"
      );

    var difference =
      end.getTime() -
      start.getTime();

    if (
      difference <= 0
    ) {
      return 0;
    }

    return Math.round(
      difference /
      86400000
    );
  }

  function updateReservationBreakdown() {
    var room =
      getReservationValue(
        "room"
      );

    var nightlyRate =
      ROOM_NIGHTLY_RATES[room] ||
      0;

    var nights =
      getReservationNights();

    var subtotal =
      nightlyRate *
      nights;

    if (reservationNights) {
      reservationNights.textContent =
        nights +
        (
          nights === 1
            ? " night"
            : " nights"
        );
    }

    if (reservationNightly) {
      reservationNightly.textContent =
        nightlyRate
          ? formatReservationCurrency(
              nightlyRate
            ) +
            " / night"
          : "₹0 / night";
    }

    if (reservationSubtotal) {
      reservationSubtotal.textContent =
        formatReservationCurrency(
          subtotal
        );
    }

    if (reservationTotal) {
      reservationTotal.textContent =
        formatReservationCurrency(
          subtotal
        );
    }
  }

  function buildReservationMessage() {
    var name =
      getReservationValue(
        "name"
      );

    var phone =
      getReservationValue(
        "phone"
      );

    var email =
      getReservationValue(
        "email"
      );

    var checkIn =
      getReservationValue(
        "checkin"
      );

    var checkOut =
      getReservationValue(
        "checkout"
      );

    var guests =
      getReservationValue(
        "guests"
      );

    var room =
      getReservationValue(
        "room"
      );

    var message =
      getReservationValue(
        "message"
      );

    return [
      "Hello Hotel Vishaka Paark,",
      "",
      "I would like to enquire about a reservation.",
      "",
      "Name: " + name,
      "Phone: " + phone,
      email ? "Email: " + email : "",
      "Check-in: " + formatDateForGuest(checkIn),
      "Check-out: " + formatDateForGuest(checkOut),
      "Check-in time: " +
        getReservationValue(
          "checkin-time"
        ),
      "Check-out time: " +
        getReservationValue(
          "checkout-time"
        ),
      "Guests: " + guests,
      "Room preference: " + room,
      "Duration: " +
        getReservationNights() +
        " nights",
      "Estimated room charges: " +
        formatReservationCurrency(
          (ROOM_NIGHTLY_RATES[room] || 0) *
          getReservationNights()
        ) +
        " incl. GST",
      message
        ? "Special request: " + message
        : "",
      "",
      "Please confirm availability and booking details."
    ]
      .filter(function (line) {
        return Boolean(line);
      })
      .join("\n");
  }

  $$('[data-open-reservation]').forEach(
    function (button) {
      button.addEventListener(
        "click",
        function () {
          setReservationState(true);
        }
      );
    }
  );

  var reservationClose =
    $(".reservation-close");

  var reservationBackdrop =
    $(".reservation-backdrop");

  if (reservationClose) {
    reservationClose.addEventListener(
      "click",
      function () {
        setReservationState(false);
      }
    );
  }

  if (reservationBackdrop) {
    reservationBackdrop.addEventListener(
      "click",
      function () {
        setReservationState(false);
      }
    );
  }

  document.addEventListener(
    "keydown",
    function (event) {
      if (
        event.key === "Escape" &&
        reservationModal &&
        reservationModal.classList.contains(
          "is-open"
        )
      ) {
        setReservationState(false);
      }
    }
  );

  if (reservationForm) {
    $$('input, select, textarea', reservationForm).forEach(
      function (field) {
        field.addEventListener(
          "input",
          updateReservationBreakdown
        );

        field.addEventListener(
          "change",
          updateReservationBreakdown
        );
      }
    );

    reservationForm.addEventListener(
      "submit",
      function (event) {
        event.preventDefault();

        if (!reservationForm.reportValidity()) {
          return;
        }

        reservationMessage =
          buildReservationMessage();

        if (reservationSendOptions) {
          reservationSendOptions.hidden = false;
        }
      }
    );

    updateReservationBreakdown();
  }

  var sendReservationEmail =
    $("[data-send-reservation-email]");

  var sendReservationWhatsApp =
    $("[data-send-reservation-whatsapp]");

  if (sendReservationEmail) {
    sendReservationEmail.addEventListener(
      "click",
      function () {
        var subject = encodeURIComponent(
          "Reservation enquiry - " +
          HOTEL.name
        );

        window.location.href =
          "mailto:" +
          HOTEL.email +
          "?subject=" +
          subject +
          "&body=" +
          encodeURIComponent(
            reservationMessage
          );
      }
    );
  }

  if (sendReservationWhatsApp) {
    sendReservationWhatsApp.addEventListener(
      "click",
      function () {
        window.location.href =
          "https://wa.me/" +
          HOTEL.whatsapp +
          "?text=" +
          encodeURIComponent(
            reservationMessage
          );
      }
    );
  }

  /* =========================================================
     INITIALISE
     ========================================================= */

  document.documentElement.classList.add(
    "js-ready"
  );
})();