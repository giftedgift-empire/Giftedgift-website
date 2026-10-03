/*
=========================================================
GIFTEDGIFT EMPIRE
MULTI-LANGUAGE SYSTEM

EN = English
FR = French
DE = German
NL = Dutch
=========================================================
*/

(function () {
  "use strict";


  /*
  =========================================================
  PREVENT DUPLICATE LOADING
  =========================================================
  */

  if (
    window.__GiftedGiftLanguageLoaded
  ) {

    return;

  }


  window.__GiftedGiftLanguageLoaded =
    true;


  /*
  =========================================================
  CONFIGURATION
  =========================================================
  */

  const STORAGE_KEY =
    "giftedgift_language";


  const SUPPORTED =
    [
      "en",
      "fr",
      "de",
      "nl"
    ];


  const LANGUAGE_INDEX = {

    fr: 0,

    de: 1,

    nl: 2

  };


  /*
  Each translation row:
  [French, German, Dutch]
  */


  const T = {


    /*
    =====================================================
    MAIN NAVIGATION
    =====================================================
    */

    "Home":
      [
        "Accueil",
        "Startseite",
        "Home"
      ],

    "Shop":
      [
        "Boutique",
        "Shop",
        "Winkel"
      ],

    "Categories":
      [
        "Catégories",
        "Kategorien",
        "Categorieën"
      ],

    "Daily Inspiration":
      [
        "Inspiration du jour",
        "Tägliche Inspiration",
        "Dagelijkse inspiratie"
      ],

    "Blog":
      [
        "Blog",
        "Blog",
        "Blog"
      ],

    "Deals":
      [
        "Offres",
        "Angebote",
        "Aanbiedingen"
      ],

    "About":
      [
        "À propos",
        "Über uns",
        "Over ons"
      ],

    "Contact":
      [
        "Contact",
        "Kontakt",
        "Contact"
      ],

    "Cart":
      [
        "Panier",
        "Warenkorb",
        "Winkelwagen"
      ],

    "🛒 Cart":
      [
        "🛒 Panier",
        "🛒 Warenkorb",
        "🛒 Winkelwagen"
      ],


    /*
    =====================================================
    HOMEPAGE HERO
    =====================================================
    */

    "Discover More.":
      [
        "Découvrez plus.",
        "Mehr entdecken.",
        "Ontdek meer."
      ],

    "Shop Smarter.":
      [
        "Achetez plus intelligemment.",
        "Cleverer einkaufen.",
        "Slimmer winkelen."
      ],

    "Explore handpicked products, fashion, digital resources, African foodstuffs, deals and useful recommendations—all in one place.":
      [
        "Découvrez des produits sélectionnés, de la mode, des ressources numériques, des produits alimentaires africains, des offres et des recommandations utiles, le tout au même endroit.",
        "Entdecken Sie ausgewählte Produkte, Mode, digitale Ressourcen, afrikanische Lebensmittel, Angebote und nützliche Empfehlungen – alles an einem Ort.",
        "Ontdek geselecteerde producten, mode, digitale bronnen, Afrikaanse levensmiddelen, aanbiedingen en handige aanbevelingen, allemaal op één plek."
      ],

    "Explore Our Picks →":
      [
        "Découvrez notre sélection →",
        "Unsere Auswahl entdecken →",
        "Ontdek onze selectie →"
      ],

    "Explore Our Picks":
      [
        "Découvrez notre sélection",
        "Unsere Auswahl entdecken",
        "Ontdek onze selectie"
      ],

    "Shop All Products":
      [
        "Voir tous les produits",
        "Alle Produkte ansehen",
        "Alle producten bekijken"
      ],

    "Loading our picks...":
      [
        "Chargement de notre sélection...",
        "Unsere Auswahl wird geladen...",
        "Onze selectie laden..."
      ],


    /*
    =====================================================
    TRUST / SHOPPING
    =====================================================
    */

    "Useful Products":
      [
        "Produits utiles",
        "Nützliche Produkte",
        "Handige producten"
      ],

    "Practical finds for everyday life":
      [
        "Des trouvailles pratiques pour le quotidien",
        "Praktische Funde für den Alltag",
        "Praktische vondsten voor elke dag"
      ],

    "Trusted Recommendations":
      [
        "Recommandations de confiance",
        "Vertrauenswürdige Empfehlungen",
        "Betrouwbare aanbevelingen"
      ],

    "Carefully selected finds":
      [
        "Des trouvailles soigneusement sélectionnées",
        "Sorgfältig ausgewählte Funde",
        "Zorgvuldig geselecteerde vondsten"
      ],

    "Best Deals":
      [
        "Meilleures offres",
        "Beste Angebote",
        "Beste aanbiedingen"
      ],

    "Offers worth discovering":
      [
        "Des offres à découvrir",
        "Angebote, die sich zu entdecken lohnen",
        "Aanbiedingen die het ontdekken waard zijn"
      ],

    "Shop with Confidence":
      [
        "Achetez en toute confiance",
        "Sicher einkaufen",
        "Winkel met vertrouwen"
      ],

    "Secure checkout where available":
      [
        "Paiement sécurisé lorsque disponible",
        "Sicherer Checkout, sofern verfügbar",
        "Veilig afrekenen waar beschikbaar"
      ],


    /*
    =====================================================
    CATEGORIES / PRODUCTS
    =====================================================
    */

    "Shop by Category":
      [
        "Acheter par catégorie",
        "Nach Kategorie einkaufen",
        "Winkelen per categorie"
      ],

    "Browse our main shopping categories and find products that suit your needs.":
      [
        "Parcourez nos principales catégories et trouvez des produits adaptés à vos besoins.",
        "Durchsuchen Sie unsere wichtigsten Einkaufskategorien und finden Sie passende Produkte.",
        "Bekijk onze belangrijkste winkelcategorieën en vind producten die bij je behoeften passen."
      ],

    "Loading categories...":
      [
        "Chargement des catégories...",
        "Kategorien werden geladen...",
        "Categorieën laden..."
      ],

    "Handpicked for You":
      [
        "Sélectionnés pour vous",
        "Für Sie ausgewählt",
        "Voor jou geselecteerd"
      ],

    "🔥 Featured Products":
      [
        "🔥 Produits à la une",
        "🔥 Empfohlene Produkte",
        "🔥 Uitgelichte producten"
      ],

    "View All →":
      [
        "Voir tout →",
        "Alle ansehen →",
        "Alles bekijken →"
      ],

    "Loading products...":
      [
        "Chargement des produits...",
        "Produkte werden geladen...",
        "Producten laden..."
      ],


    /*
    =====================================================
    DISCOVER
    =====================================================
    */

    "More to Discover":
      [
        "Plus à découvrir",
        "Mehr entdecken",
        "Meer ontdekken"
      ],

    "Explore GiftedGift Empire":
      [
        "Découvrez GiftedGift Empire",
        "GiftedGift Empire entdecken",
        "Ontdek GiftedGift Empire"
      ],

    "Find special offers, inspiration, helpful articles and shopping information across the website.":
      [
        "Découvrez des offres spéciales, de l’inspiration, des articles utiles et des informations d’achat sur le site.",
        "Entdecken Sie Sonderangebote, Inspiration, hilfreiche Artikel und Einkaufsinformationen auf der Website.",
        "Ontdek speciale aanbiedingen, inspiratie, handige artikelen en winkelinformatie op de website."
      ],

    "Find encouraging Bible verses, prayers and uplifting words to inspire your day.":
      [
        "Découvrez des versets bibliques encourageants, des prières et des paroles édifiantes pour inspirer votre journée.",
        "Finden Sie ermutigende Bibelverse, Gebete und aufbauende Worte für Ihren Tag.",
        "Vind bemoedigende Bijbelverzen, gebeden en opbeurende woorden voor je dag."
      ],

    "Get Inspired":
      [
        "Inspirez-vous",
        "Inspiration entdecken",
        "Laat je inspireren"
      ],

    "Discover special offers and reduced-price products currently available.":
      [
        "Découvrez les offres spéciales et les produits actuellement à prix réduit.",
        "Entdecken Sie aktuelle Sonderangebote und reduzierte Produkte.",
        "Ontdek speciale aanbiedingen en producten die nu zijn afgeprijsd."
      ],

    "View Deals":
      [
        "Voir les offres",
        "Angebote ansehen",
        "Bekijk aanbiedingen"
      ],

    "Read helpful guides, recommendations, shopping tips and useful information.":
      [
        "Lisez des guides utiles, des recommandations, des conseils d’achat et des informations pratiques.",
        "Lesen Sie hilfreiche Ratgeber, Empfehlungen, Einkaufstipps und nützliche Informationen.",
        "Lees handige gidsen, aanbevelingen, winkeltips en nuttige informatie."
      ],

    "Read Blog":
      [
        "Lire le blog",
        "Blog lesen",
        "Lees blog"
      ],

    "African Foodstuffs":
      [
        "Produits alimentaires africains",
        "Afrikanische Lebensmittel",
        "Afrikaanse levensmiddelen"
      ],

    "Browse African food products and submit your order directly through WhatsApp.":
      [
        "Parcourez les produits alimentaires africains et envoyez votre commande directement via WhatsApp.",
        "Entdecken Sie afrikanische Lebensmittel und senden Sie Ihre Bestellung direkt über WhatsApp.",
        "Bekijk Afrikaanse levensmiddelen en verstuur je bestelling rechtstreeks via WhatsApp."
      ],

    "Shop Foodstuffs":
      [
        "Acheter des produits alimentaires",
        "Lebensmittel kaufen",
        "Levensmiddelen kopen"
      ],


    /*
    =====================================================
    OPPORTUNITIES
    =====================================================
    */

    "Opportunities":
      [
        "Opportunités",
        "Möglichkeiten",
        "Mogelijkheden"
      ],

    "Work With GiftedGift Empire":
      [
        "Collaborez avec GiftedGift Empire",
        "Mit GiftedGift Empire zusammenarbeiten",
        "Werk met GiftedGift Empire"
      ],

    "Earn, advertise or sell through GiftedGift Empire.":
      [
        "Gagnez, faites de la publicité ou vendez avec GiftedGift Empire.",
        "Verdienen, werben oder verkaufen Sie über GiftedGift Empire.",
        "Verdien, adverteer of verkoop via GiftedGift Empire."
      ],

    "Earn With Us":
      [
        "Gagnez avec nous",
        "Mit uns verdienen",
        "Verdien met ons"
      ],

    "Join Affiliate Program →":
      [
        "Rejoindre le programme d’affiliation →",
        "Affiliate-Programm beitreten →",
        "Word affiliate →"
      ],

    "Advertise With Us":
      [
        "Faites de la publicité avec nous",
        "Bei uns werben",
        "Adverteer bij ons"
      ],

    "Apply to Advertise →":
      [
        "Faire une demande de publicité →",
        "Werbung beantragen →",
        "Aanmelden om te adverteren →"
      ],

    "Sell With Us":
      [
        "Vendez avec nous",
        "Bei uns verkaufen",
        "Verkoop bij ons"
      ],

    "Become a Creator →":
      [
        "Devenir créateur →",
        "Creator werden →",
        "Word creator →"
      ],


    /*
    =====================================================
    COMPANY / SUPPORT
    =====================================================
    */

    "About GiftedGift Empire":
      [
        "À propos de GiftedGift Empire",
        "Über GiftedGift Empire",
        "Over GiftedGift Empire"
      ],

    "About Us":
      [
        "À propos de nous",
        "Über uns",
        "Over ons"
      ],

    "Contact Us":
      [
        "Nous contacter",
        "Kontaktieren Sie uns",
        "Neem contact op"
      ],

    "Customer Care":
      [
        "Service client",
        "Kundenservice",
        "Klantenservice"
      ],

    "Need Help?":
      [
        "Besoin d’aide ?",
        "Brauchen Sie Hilfe?",
        "Hulp nodig?"
      ],

    "Customer Service & Support":
      [
        "Service client et assistance",
        "Kundenservice & Support",
        "Klantenservice & ondersteuning"
      ],

    "Customer Service & Support →":
      [
        "Service client et assistance →",
        "Kundenservice & Support →",
        "Klantenservice & ondersteuning →"
      ],


    /*
    =====================================================
    NEWSLETTER
    =====================================================
    */

    "💌 Join the GiftedGift Empire Newsletter":
      [
        "💌 Rejoignez la newsletter GiftedGift Empire",
        "💌 GiftedGift Empire Newsletter abonnieren",
        "💌 Schrijf je in voor de GiftedGift Empire nieuwsbrief"
      ],

    "Join the GiftedGift Empire Newsletter":
      [
        "Rejoignez la newsletter GiftedGift Empire",
        "GiftedGift Empire Newsletter abonnieren",
        "Schrijf je in voor de GiftedGift Empire nieuwsbrief"
      ],

    "Be the first to hear about new products, special deals, useful updates and GiftedGift Empire news.":
      [
        "Soyez parmi les premiers informés des nouveaux produits, offres spéciales, mises à jour utiles et actualités de GiftedGift Empire.",
        "Erfahren Sie als Erste von neuen Produkten, Sonderangeboten, nützlichen Updates und Neuigkeiten von GiftedGift Empire.",
        "Hoor als eerste over nieuwe producten, speciale aanbiedingen, handige updates en nieuws van GiftedGift Empire."
      ],

    "Stay Connected With GiftedGift Empire":
      [
        "Restez connecté avec GiftedGift Empire",
        "Bleiben Sie mit GiftedGift Empire verbunden",
        "Blijf verbonden met GiftedGift Empire"
      ],

    "Receive faith inspiration, useful ideas, resources and new GiftedGift Empire content by email.":
      [
        "Recevez par e-mail des inspirations de foi, des idées utiles, des ressources et les nouveaux contenus de GiftedGift Empire.",
        "Erhalten Sie Glaubensinspiration, nützliche Ideen, Ressourcen und neue Inhalte von GiftedGift Empire per E-Mail.",
        "Ontvang geloofsinspiratie, handige ideeën, bronnen en nieuwe GiftedGift Empire-content per e-mail."
      ],

    "Get useful business ideas, digital resources, smart finds, fashion inspiration and new GiftedGift Empire content.":
      [
        "Recevez des idées d’entreprise utiles, des ressources numériques, des trouvailles pratiques, de l’inspiration mode et les nouveaux contenus de GiftedGift Empire.",
        "Erhalten Sie nützliche Geschäftsideen, digitale Ressourcen, clevere Funde, Modeinspiration und neue Inhalte von GiftedGift Empire.",
        "Ontvang handige businessideeën, digitale bronnen, slimme vondsten, mode-inspiratie en nieuwe GiftedGift Empire-content."
      ],

    "Name":
      [
        "Nom",
        "Name",
        "Naam"
      ],

    "Your Name":
      [
        "Votre nom",
        "Ihr Name",
        "Je naam"
      ],

    "Your Name *":
      [
        "Votre nom *",
        "Ihr Name *",
        "Je naam *"
      ],

    "Email":
      [
        "E-mail",
        "E-Mail",
        "E-mail"
      ],

    "Email Address":
      [
        "Adresse e-mail",
        "E-Mail-Adresse",
        "E-mailadres"
      ],

    "Email Address *":
      [
        "Adresse e-mail *",
        "E-Mail-Adresse *",
        "E-mailadres *"
      ],

    "Website":
      [
        "Site web",
        "Webseite",
        "Website"
      ],

    "Subscribe":
      [
        "S’abonner",
        "Abonnieren",
        "Inschrijven"
      ],

    "I agree to receive emails from GiftedGift Empire. I understand that I can unsubscribe at any time.":
      [
        "J’accepte de recevoir des e-mails de GiftedGift Empire. Je comprends que je peux me désabonner à tout moment.",
        "Ich stimme zu, E-Mails von GiftedGift Empire zu erhalten. Ich kann mich jederzeit abmelden.",
        "Ik ga ermee akkoord e-mails van GiftedGift Empire te ontvangen. Ik kan me op elk moment uitschrijven."
      ],

    "I agree to receive GiftedGift Empire emails. I can unsubscribe at any time.":
      [
        "J’accepte de recevoir les e-mails de GiftedGift Empire. Je peux me désabonner à tout moment.",
        "Ich stimme dem Erhalt von E-Mails von GiftedGift Empire zu. Ich kann mich jederzeit abmelden.",
        "Ik ga akkoord met het ontvangen van e-mails van GiftedGift Empire. Ik kan me op elk moment afmelden."
      ],

    "We respect your privacy and will not sell your email address. See our":
      [
        "Nous respectons votre vie privée et ne vendrons pas votre adresse e-mail. Consultez notre",
        "Wir respektieren Ihre Privatsphäre und verkaufen Ihre E-Mail-Adresse nicht. Siehe unsere",
        "We respecteren je privacy en verkopen je e-mailadres niet. Bekijk ons"
      ],


    /*
    =====================================================
    FOOTER / GENERAL
    =====================================================
    */

    "Privacy Policy":
      [
        "Politique de confidentialité",
        "Datenschutzerklärung",
        "Privacybeleid"
      ],

    "Returns & Refunds":
      [
        "Retours et remboursements",
        "Rückgabe & Erstattung",
        "Retouren & terugbetalingen"
      ],

    "Shipping Policy":
      [
        "Politique d’expédition",
        "Versandrichtlinie",
        "Verzendbeleid"
      ],

    "Terms & Conditions":
      [
        "Conditions générales",
        "Allgemeine Geschäftsbedingungen",
        "Algemene voorwaarden"
      ],

    "Legal Notice":
      [
        "Mentions légales",
        "Impressum",
        "Juridische informatie"
      ],

    "Information":
      [
        "Informations",
        "Informationen",
        "Informatie"
      ],

    "Work With Us":
      [
        "Collaborez avec nous",
        "Mit uns arbeiten",
        "Werk met ons"
      ],

    "Affiliate Program":
      [
        "Programme d’affiliation",
        "Affiliate-Programm",
        "Affiliateprogramma"
      ],

    "Customer Support":
      [
        "Assistance client",
        "Kundensupport",
        "Klantenondersteuning"
      ],


    /*
    =====================================================
    SHOP
    =====================================================
    */

    "Product Type":
      [
        "Type de produit",
        "Produkttyp",
        "Producttype"
      ],

    "Physical":
      [
        "Physique",
        "Physisch",
        "Fysiek"
      ],

    "Digital":
      [
        "Numérique",
        "Digital",
        "Digitaal"
      ],

    "Creator Marketplace":
      [
        "Marché des créateurs",
        "Creator-Marktplatz",
        "Creator-marktplaats"
      ],

    "Affiliate":
      [
        "Affiliation",
        "Affiliate",
        "Affiliate"
      ],

    "🥘 Shop African Foodstuffs on WhatsApp":
      [
        "🥘 Acheter des produits alimentaires africains sur WhatsApp",
        "🥘 Afrikanische Lebensmittel über WhatsApp kaufen",
        "🥘 Afrikaanse levensmiddelen kopen via WhatsApp"
      ],

    "All Categories":
      [
        "Toutes les catégories",
        "Alle Kategorien",
        "Alle categorieën"
      ],

    "Home & Living":
      [
        "Maison et quotidien",
        "Wohnen & Alltag",
        "Wonen & leven"
      ],

    "Fashion & Accessories":
      [
        "Mode et accessoires",
        "Mode & Accessoires",
        "Mode & accessoires"
      ],

    "Useful Finds":
      [
        "Trouvailles utiles",
        "Nützliche Entdeckungen",
        "Handige vondsten"
      ],

    "Beauty & Lifestyle":
      [
        "Beauté et art de vivre",
        "Beauty & Lifestyle",
        "Beauty & lifestyle"
      ],

    "Health & Wellness":
      [
        "Santé et bien-être",
        "Gesundheit & Wellness",
        "Gezondheid & wellness"
      ],

    "Digital Products":
      [
        "Produits numériques",
        "Digitale Produkte",
        "Digitale producten"
      ],


    /*
    =====================================================
    DEALS
    =====================================================
    */

    "Deals & Special Offers":
      [
        "Offres et promotions",
        "Angebote & Aktionen",
        "Aanbiedingen & acties"
      ],

    "Discover current discounts and special offers available across GiftedGift Empire.":
      [
        "Découvrez les remises et offres spéciales actuellement disponibles sur GiftedGift Empire.",
        "Entdecken Sie aktuelle Rabatte und Sonderangebote auf GiftedGift Empire.",
        "Ontdek huidige kortingen en speciale aanbiedingen op GiftedGift Empire."
      ],

    "Current Deals":
      [
        "Offres en cours",
        "Aktuelle Angebote",
        "Actuele aanbiedingen"
      ],

    "Limited-time offers available right now.":
      [
        "Offres à durée limitée disponibles maintenant.",
        "Zeitlich begrenzte Angebote, die jetzt verfügbar sind.",
        "Tijdelijke aanbiedingen die nu beschikbaar zijn."
      ],

    "Loading current deals...":
      [
        "Chargement des offres en cours...",
        "Angebote werden geladen...",
        "Aanbiedingen laden..."
      ],

    "No active deals right now":
      [
        "Aucune offre active pour le moment",
        "Derzeit keine aktiven Angebote",
        "Momenteel geen actieve aanbiedingen"
      ],

    "Shop Now":
      [
        "Acheter maintenant",
        "Jetzt einkaufen",
        "Nu winkelen"
      ],


    /*
    =====================================================
    ABOUT
    =====================================================
    */

    "ABOUT OUR PLATFORM":
      [
        "À PROPOS DE NOTRE PLATEFORME",
        "ÜBER UNSERE PLATTFORM",
        "OVER ONS PLATFORM"
      ],

    "What Is GiftedGift Empire?":
      [
        "Qu’est-ce que GiftedGift Empire ?",
        "Was ist GiftedGift Empire?",
        "Wat is GiftedGift Empire?"
      ],

    "What You Can Discover":
      [
        "Ce que vous pouvez découvrir",
        "Was Sie entdecken können",
        "Wat je kunt ontdekken"
      ],

    "Lifestyle Products":
      [
        "Produits du quotidien",
        "Lifestyle-Produkte",
        "Lifestyleproducten"
      ],

    "Deals & Recommendations":
      [
        "Offres et recommandations",
        "Angebote & Empfehlungen",
        "Aanbiedingen & aanbevelingen"
      ],

    "Opportunities With GiftedGift Empire":
      [
        "Opportunités avec GiftedGift Empire",
        "Möglichkeiten mit GiftedGift Empire",
        "Mogelijkheden met GiftedGift Empire"
      ],

    "Our Mission":
      [
        "Notre mission",
        "Unsere Mission",
        "Onze missie"
      ],


    /*
    =====================================================
    CONTACT
    =====================================================
    */

    "Contact GiftedGift Empire":
      [
        "Contacter GiftedGift Empire",
        "GiftedGift Empire kontaktieren",
        "Contact opnemen met GiftedGift Empire"
      ],

    "Business & General Enquiries":
      [
        "Demandes commerciales et générales",
        "Geschäftliche & allgemeine Anfragen",
        "Zakelijke & algemene vragen"
      ],

    "Email GiftedGift Empire":
      [
        "Envoyer un e-mail à GiftedGift Empire",
        "GiftedGift Empire per E-Mail kontaktieren",
        "E-mail GiftedGift Empire"
      ],

    "Need Customer Support?":
      [
        "Besoin d’assistance client ?",
        "Benötigen Sie Kundensupport?",
        "Klantenservice nodig?"
      ],


    /*
    =====================================================
    PHYSICAL PRODUCTS / FASHION
    =====================================================
    */

    "← Back to Shop":
      [
        "← Retour à la boutique",
        "← Zurück zum Shop",
        "← Terug naar de winkel"
      ],

    "Loading product...":
      [
        "Chargement du produit...",
        "Produkt wird geladen...",
        "Product laden..."
      ],

    "Product image coming soon":
      [
        "Image du produit bientôt disponible",
        "Produktbild folgt in Kürze",
        "Productafbeelding binnenkort beschikbaar"
      ],

    "No customer reviews yet":
      [
        "Aucun avis client pour le moment",
        "Noch keine Kundenbewertungen",
        "Nog geen klantbeoordelingen"
      ],

    "👗 Fashion Details":
      [
        "👗 Détails mode",
        "👗 Modedetails",
        "👗 Modedetails"
      ],

    "How would you like to order?":
      [
        "Comment souhaitez-vous commander ?",
        "Wie möchten Sie bestellen?",
        "Hoe wil je bestellen?"
      ],

    "Ready to Wear":
      [
        "Prêt-à-porter",
        "Konfektionskleidung",
        "Ready-to-wear"
      ],

    "Choose an available size and colour.":
      [
        "Choisissez une taille et une couleur disponibles.",
        "Wählen Sie eine verfügbare Größe und Farbe.",
        "Kies een beschikbare maat en kleur."
      ],

    "Sew on Demand":
      [
        "Confection sur demande",
        "Anfertigung auf Bestellung",
        "Op bestelling gemaakt"
      ],

    "Ready-to-Wear Options":
      [
        "Options prêt-à-porter",
        "Konfektionsoptionen",
        "Ready-to-wear opties"
      ],

    "Size":
      [
        "Taille",
        "Größe",
        "Maat"
      ],

    "Select size":
      [
        "Choisir une taille",
        "Größe auswählen",
        "Selecteer maat"
      ],

    "Colour":
      [
        "Couleur",
        "Farbe",
        "Kleur"
      ],

    "Select colour":
      [
        "Choisir une couleur",
        "Farbe auswählen",
        "Selecteer kleur"
      ],

    "Body Size Guide":
      [
        "Guide des tailles corporelles",
        "Körpergrößen-Leitfaden",
        "Lichaamsmaattabel"
      ],

    "Garment Measurements":
      [
        "Mesures du vêtement",
        "Kleidungsmaße",
        "Kledingmaten"
      ],

    "Quantity":
      [
        "Quantité",
        "Menge",
        "Aantal"
      ],

    "Add to Cart":
      [
        "Ajouter au panier",
        "In den Warenkorb",
        "Toevoegen aan winkelwagen"
      ],

    "🛒 View Cart & Checkout":
      [
        "🛒 Voir le panier et passer au paiement",
        "🛒 Warenkorb & Kasse",
        "🛒 Winkelwagen & afrekenen"
      ],

    "OR":
      [
        "OU",
        "ODER",
        "OF"
      ],

    "Complete Purchase on WhatsApp":
      [
        "Finaliser l’achat sur WhatsApp",
        "Kauf über WhatsApp abschließen",
        "Aankoop afronden via WhatsApp"
      ],

    "Full Name":
      [
        "Nom complet",
        "Vollständiger Name",
        "Volledige naam"
      ],

    "Full Name *":
      [
        "Nom complet *",
        "Vollständiger Name *",
        "Volledige naam *"
      ],

    "Phone Number":
      [
        "Numéro de téléphone",
        "Telefonnummer",
        "Telefoonnummer"
      ],

    "Delivery Address":
      [
        "Adresse de livraison",
        "Lieferadresse",
        "Bezorgadres"
      ],

    "Postal Code":
      [
        "Code postal",
        "Postleitzahl",
        "Postcode"
      ],

    "City":
      [
        "Ville",
        "Stadt",
        "Plaats"
      ],

    "Country":
      [
        "Pays",
        "Land",
        "Land"
      ],

    "Order Note (optional)":
      [
        "Note de commande (facultatif)",
        "Bestellnotiz (optional)",
        "Bestelnotitie (optioneel)"
      ],

    "Customer Reviews":
      [
        "Avis clients",
        "Kundenbewertungen",
        "Klantbeoordelingen"
      ],

    "Reviews":
      [
        "Avis",
        "Bewertungen",
        "Beoordelingen"
      ],

    "Leave a Review":
      [
        "Laisser un avis",
        "Bewertung abgeben",
        "Beoordeling achterlaten"
      ],

    "Your Rating":
      [
        "Votre note",
        "Ihre Bewertung",
        "Je beoordeling"
      ],

    "Your Review":
      [
        "Votre avis",
        "Ihre Rezension",
        "Je review"
      ],

    "Submit Review":
      [
        "Envoyer l’avis",
        "Bewertung senden",
        "Beoordeling versturen"
      ],


    /*
    =====================================================
    FOODSTUFFS
    =====================================================
    */

    "← Home":
      [
        "← Accueil",
        "← Startseite",
        "← Home"
      ],

    "← All Foodstuffs":
      [
        "← Tous les produits alimentaires",
        "← Alle Lebensmittel",
        "← Alle levensmiddelen"
      ],

    "Loading foodstuffs...":
      [
        "Chargement des produits alimentaires...",
        "Lebensmittel werden geladen...",
        "Levensmiddelen laden..."
      ],

    "Your Foodstuff Order":
      [
        "Votre commande de produits alimentaires",
        "Ihre Lebensmittelbestellung",
        "Je levensmiddelenbestelling"
      ],

    "No foodstuff selected yet.":
      [
        "Aucun produit alimentaire sélectionné pour le moment.",
        "Noch keine Lebensmittel ausgewählt.",
        "Nog geen levensmiddelen geselecteerd."
      ],

    "Product Total":
      [
        "Total des produits",
        "Produktsumme",
        "Producttotaal"
      ],

    "Delivery Details":
      [
        "Informations de livraison",
        "Lieferdetails",
        "Bezorggegevens"
      ],

    "🟢 Submit Order on WhatsApp":
      [
        "🟢 Envoyer la commande sur WhatsApp",
        "🟢 Bestellung über WhatsApp senden",
        "🟢 Bestelling via WhatsApp versturen"
      ],


    /*
    =====================================================
    BLOG
    =====================================================
    */

    "GiftedGift Empire Blog":
      [
        "Blog GiftedGift Empire",
        "GiftedGift Empire Blog",
        "GiftedGift Empire Blog"
      ],

    "Latest From the Blog":
      [
        "Derniers articles du blog",
        "Neueste Blogbeiträge",
        "Nieuwste blogberichten"
      ],

    "Loading articles...":
      [
        "Chargement des articles...",
        "Artikel werden geladen...",
        "Artikelen laden..."
      ],

    "Articles Coming Soon":
      [
        "Articles bientôt disponibles",
        "Artikel folgen in Kürze",
        "Artikelen binnenkort beschikbaar"
      ],

    "← Back to Blog":
      [
        "← Retour au blog",
        "← Zurück zum Blog",
        "← Terug naar blog"
      ],

    "View Product":
      [
        "Voir le produit",
        "Produkt ansehen",
        "Product bekijken"
      ],

    "Related Articles":
      [
        "Articles connexes",
        "Verwandte Artikel",
        "Gerelateerde artikelen"
      ],

    "Continue exploring useful GiftedGift Empire content.":
      [
        "Continuez à découvrir les contenus utiles de GiftedGift Empire.",
        "Entdecken Sie weitere nützliche Inhalte von GiftedGift Empire.",
        "Ontdek meer nuttige content van GiftedGift Empire."
      ],

    "Useful products and digital resources you may also want to explore.":
      [
        "Des produits utiles et des ressources numériques que vous pourriez également découvrir.",
        "Nützliche Produkte und digitale Ressourcen, die Sie ebenfalls entdecken können.",
        "Handige producten en digitale bronnen die je misschien ook wilt bekijken."
      ],

    "Read Article":
      [
        "Lire l’article",
        "Artikel lesen",
        "Artikel lezen"
      ],

    "Watch the Related Video":
      [
        "Regarder la vidéo associée",
        "Passendes Video ansehen",
        "Bekijk de bijbehorende video"
      ],

    "Prefer to watch? Open the related GiftedGift Empire video on YouTube.":
      [
        "Vous préférez regarder ? Ouvrez la vidéo GiftedGift Empire associée sur YouTube.",
        "Sie möchten lieber zuschauen? Öffnen Sie das passende GiftedGift Empire-Video auf YouTube.",
        "Kijk je liever? Open de bijbehorende GiftedGift Empire-video op YouTube."
      ],

    "▶ Watch on YouTube":
      [
        "▶ Regarder sur YouTube",
        "▶ Auf YouTube ansehen",
        "▶ Bekijken op YouTube"
      ],


    /*
    =====================================================
    DAILY INSPIRATION
    =====================================================
    */

    "← Back to Daily Inspiration":
      [
        "← Retour à l’inspiration du jour",
        "← Zurück zur täglichen Inspiration",
        "← Terug naar dagelijkse inspiratie"
      ],

    "Loading inspiration...":
      [
        "Chargement de l’inspiration...",
        "Inspiration wird geladen...",
        "Inspiratie laden..."
      ],

    "Explore by Category":
      [
        "Explorer par catégorie",
        "Nach Kategorie entdecken",
        "Ontdek per categorie"
      ],

    "Choose the kind of inspiration you want to read today.":
      [
        "Choisissez le type d’inspiration que vous souhaitez lire aujourd’hui.",
        "Wählen Sie die Art von Inspiration, die Sie heute lesen möchten.",
        "Kies het soort inspiratie dat je vandaag wilt lezen."
      ],

    "All":
      [
        "Tous",
        "Alle",
        "Alles"
      ],

    "God's Word for Today":
      [
        "La Parole de Dieu pour aujourd’hui",
        "Gottes Wort für heute",
        "Gods Woord voor vandaag"
      ],

    "Peace Before Sleep":
      [
        "Paix avant de dormir",
        "Frieden vor dem Schlafengehen",
        "Rust voor het slapen"
      ],

    "Breakthrough":
      [
        "Percée",
        "Durchbruch",
        "Doorbraak"
      ],

    "Prayer":
      [
        "Prière",
        "Gebet",
        "Gebed"
      ],

    "Prayer:":
      [
        "Prière :",
        "Gebet:",
        "Gebed:"
      ],

    "Encouragement":
      [
        "Encouragement",
        "Ermutigung",
        "Bemoediging"
      ],

    "Faith":
      [
        "Foi",
        "Glaube",
        "Geloof"
      ],

    "Open & Share Inspiration":
      [
        "Ouvrir et partager l’inspiration",
        "Inspiration öffnen und teilen",
        "Inspiratie openen en delen"
      ],

    "Share This Inspiration":
      [
        "Partager cette inspiration",
        "Diese Inspiration teilen",
        "Deel deze inspiratie"
      ],

    "Encourage someone today by sharing this message.":
      [
        "Encouragez quelqu’un aujourd’hui en partageant ce message.",
        "Ermutigen Sie heute jemanden, indem Sie diese Botschaft teilen.",
        "Bemoedig vandaag iemand door dit bericht te delen."
      ],

    "📌 Save on Pinterest":
      [
        "📌 Enregistrer sur Pinterest",
        "📌 Auf Pinterest speichern",
        "📌 Opslaan op Pinterest"
      ],

    "🔗 Copy Link":
      [
        "🔗 Copier le lien",
        "🔗 Link kopieren",
        "🔗 Link kopiëren"
      ],

    "↗ Share":
      [
        "↗ Partager",
        "↗ Teilen",
        "↗ Delen"
      ],

    "Link copied.":
      [
        "Lien copié.",
        "Link kopiert.",
        "Link gekopieerd."
      ],

    "More Daily Inspiration":
      [
        "Plus d’inspiration du jour",
        "Mehr tägliche Inspiration",
        "Meer dagelijkse inspiratie"
      ],

    "Continue with more prayers, Bible verses and encouragement.":
      [
        "Continuez avec davantage de prières, de versets bibliques et d’encouragements.",
        "Entdecken Sie weitere Gebete, Bibelverse und Ermutigungen.",
        "Ga verder met meer gebeden, Bijbelverzen en bemoediging."
      ],

    "Read Inspiration":
      [
        "Lire l’inspiration",
        "Inspiration lesen",
        "Inspiratie lezen"
      ],

    "Comments":
      [
        "Commentaires",
        "Kommentare",
        "Reacties"
      ],

    "Your Comment":
      [
        "Votre commentaire",
        "Ihr Kommentar",
        "Je reactie"
      ],

    "Post Comment":
      [
        "Publier le commentaire",
        "Kommentar veröffentlichen",
        "Reactie plaatsen"
      ],

    "No approved comments yet. Be the first to leave one.":
      [
        "Aucun commentaire approuvé pour le moment. Soyez le premier à en laisser un.",
        "Noch keine freigegebenen Kommentare. Seien Sie der Erste.",
        "Nog geen goedgekeurde reacties. Wees de eerste."
      ],

    "Thank you! Your comment has been submitted and is waiting for approval.":
      [
        "Merci ! Votre commentaire a été envoyé et attend d’être approuvé.",
        "Vielen Dank! Ihr Kommentar wurde gesendet und wartet auf Freigabe.",
        "Bedankt! Je reactie is verzonden en wacht op goedkeuring."
      ],

    "Please enter your name.":
      [
        "Veuillez saisir votre nom.",
        "Bitte geben Sie Ihren Namen ein.",
        "Vul je naam in."
      ],

    "Please write your comment.":
      [
        "Veuillez écrire votre commentaire.",
        "Bitte schreiben Sie Ihren Kommentar.",
        "Schrijf je reactie."
      ],

    "Your comment could not be submitted. Please try again.":
      [
        "Votre commentaire n’a pas pu être envoyé. Veuillez réessayer.",
        "Ihr Kommentar konnte nicht gesendet werden. Bitte versuchen Sie es erneut.",
        "Je reactie kon niet worden verzonden. Probeer het opnieuw."
      ],

    "No inspiration is available in this category yet.":
      [
        "Aucune inspiration n’est encore disponible dans cette catégorie.",
        "In dieser Kategorie ist noch keine Inspiration verfügbar.",
        "Er is nog geen inspiratie beschikbaar in deze categorie."
      ],

    "Daily Inspiration could not be loaded. Please try again later.":
      [
        "L’inspiration du jour n’a pas pu être chargée. Veuillez réessayer plus tard.",
        "Die tägliche Inspiration konnte nicht geladen werden. Bitte versuchen Sie es später erneut.",
        "De dagelijkse inspiratie kon niet worden geladen. Probeer het later opnieuw."
      ],

    "More inspiration is coming soon.":
      [
        "D’autres inspirations arrivent bientôt.",
        "Weitere Inspiration folgt bald.",
        "Binnenkort komt er meer inspiratie."
      ],

    "This inspiration could not be found or is not currently published.":
      [
        "Cette inspiration est introuvable ou n’est pas publiée actuellement.",
        "Diese Inspiration wurde nicht gefunden oder ist derzeit nicht veröffentlicht.",
        "Deze inspiratie is niet gevonden of is momenteel niet gepubliceerd."
      ],


    /*
    =====================================================
    CUSTOMER SUPPORT
    =====================================================
    */

    "Submit a Support Request":
      [
        "Envoyer une demande d’assistance",
        "Support-Anfrage senden",
        "Supportverzoek indienen"
      ],

    "Support Category *":
      [
        "Catégorie d’assistance *",
        "Support-Kategorie *",
        "Supportcategorie *"
      ],

    "Select a category":
      [
        "Choisir une catégorie",
        "Kategorie auswählen",
        "Selecteer een categorie"
      ],

    "Order":
      [
        "Commande",
        "Bestellung",
        "Bestelling"
      ],

    "Payment":
      [
        "Paiement",
        "Zahlung",
        "Betaling"
      ],

    "Delivery / Shipping":
      [
        "Livraison / Expédition",
        "Lieferung / Versand",
        "Bezorging / verzending"
      ],

    "Refund / Return":
      [
        "Remboursement / Retour",
        "Erstattung / Rückgabe",
        "Terugbetaling / retour"
      ],

    "Digital Download":
      [
        "Téléchargement numérique",
        "Digitaler Download",
        "Digitale download"
      ],

    "Account / Login":
      [
        "Compte / Connexion",
        "Konto / Anmeldung",
        "Account / inloggen"
      ],

    "Creator / Seller Support":
      [
        "Assistance créateur / vendeur",
        "Creator- / Verkäufer-Support",
        "Creator- / verkopersondersteuning"
      ],

    "Affiliate Support":
      [
        "Assistance affiliation",
        "Affiliate-Support",
        "Affiliate-ondersteuning"
      ],

    "Something Else":
      [
        "Autre chose",
        "Etwas anderes",
        "Iets anders"
      ],

    "Order / Reference Number":
      [
        "Numéro de commande / référence",
        "Bestell- / Referenznummer",
        "Bestel- / referentienummer"
      ],

    "Subject *":
      [
        "Objet *",
        "Betreff *",
        "Onderwerp *"
      ],

    "Message *":
      [
        "Message *",
        "Nachricht *",
        "Bericht *"
      ],

    "Submit Support Request":
      [
        "Envoyer la demande d’assistance",
        "Support-Anfrage senden",
        "Supportverzoek indienen"
      ],

    "Before You Submit":
      [
        "Avant d’envoyer",
        "Vor dem Absenden",
        "Voordat je verstuurt"
      ],

    "Frequently Asked Questions":
      [
        "Questions fréquentes",
        "Häufig gestellte Fragen",
        "Veelgestelde vragen"
      ],

    "General Business Enquiries":
      [
        "Demandes commerciales générales",
        "Allgemeine Geschäftsanfragen",
        "Algemene zakelijke vragen"
      ],

    "Go to Contact Page →":
      [
        "Aller à la page Contact →",
        "Zur Kontaktseite →",
        "Ga naar contactpagina →"
      ],


    /*
    =====================================================
    DIGITAL PRODUCTS
    =====================================================
    */

    "Visit Shop":
      [
        "Visiter la boutique",
        "Shop besuchen",
        "Bezoek winkel"
      ],

    "Visit Shop →":
      [
        "Visiter la boutique →",
        "Shop besuchen →",
        "Bezoek winkel →"
      ],

    "Loading digital product...":
      [
        "Chargement du produit numérique...",
        "Digitales Produkt wird geladen...",
        "Digitaal product laden..."
      ],

    "Product image unavailable":
      [
        "Image du produit indisponible",
        "Produktbild nicht verfügbar",
        "Productafbeelding niet beschikbaar"
      ],

    "Featured":
      [
        "À la une",
        "Empfohlen",
        "Uitgelicht"
      ],

    "BUY NOW":
      [
        "ACHETER MAINTENANT",
        "JETZT KAUFEN",
        "NU KOPEN"
      ],

    "Secure Digital Purchase":
      [
        "Achat numérique sécurisé",
        "Sicherer digitaler Kauf",
        "Veilige digitale aankoop"
      ],

    "Share This Product":
      [
        "Partager ce produit",
        "Dieses Produkt teilen",
        "Deel dit product"
      ],

    "Copy Link":
      [
        "Copier le lien",
        "Link kopieren",
        "Link kopiëren"
      ],

    "Share":
      [
        "Partager",
        "Teilen",
        "Delen"
      ],


    /*
    =====================================================
    FREE DIGITAL PRODUCTS
    =====================================================
    */

    "🎁 FREE DIGITAL DOWNLOAD":
      [
        "🎁 TÉLÉCHARGEMENT NUMÉRIQUE GRATUIT",
        "🎁 KOSTENLOSER DIGITALER DOWNLOAD",
        "🎁 GRATIS DIGITALE DOWNLOAD"
      ],

    "Free Digital Product":
      [
        "Produit numérique gratuit",
        "Kostenloses digitales Produkt",
        "Gratis digitaal product"
      ],

    "FREE":
      [
        "GRATUIT",
        "KOSTENLOS",
        "GRATIS"
      ],

    "Get Your Free Copy":
      [
        "Obtenez votre exemplaire gratuit",
        "Kostenloses Exemplar erhalten",
        "Ontvang je gratis exemplaar"
      ],

    "Yes, I’d like to receive GiftedGift Empire emails and access this free digital product.":
      [
        "Oui, je souhaite recevoir les e-mails de GiftedGift Empire et accéder à ce produit numérique gratuit.",
        "Ja, ich möchte E-Mails von GiftedGift Empire erhalten und auf dieses kostenlose digitale Produkt zugreifen.",
        "Ja, ik wil e-mails van GiftedGift Empire ontvangen en toegang krijgen tot dit gratis digitale product."
      ],

    "GET MY FREE DOWNLOAD":
      [
        "OBTENIR MON TÉLÉCHARGEMENT GRATUIT",
        "KOSTENLOSEN DOWNLOAD ERHALTEN",
        "ONTVANG MIJN GRATIS DOWNLOAD"
      ],

    "Your Free Product Is Ready!":
      [
        "Votre produit gratuit est prêt !",
        "Ihr kostenloses Produkt ist bereit!",
        "Je gratis product is klaar!"
      ],

    "DOWNLOAD YOUR FREE PRODUCT":
      [
        "TÉLÉCHARGER VOTRE PRODUIT GRATUIT",
        "KOSTENLOSES PRODUKT HERUNTERLADEN",
        "DOWNLOAD JE GRATIS PRODUCT"
      ],

    "🎁 BONUS INCLUDED":
      [
        "🎁 BONUS INCLUS",
        "🎁 BONUS ENTHALTEN",
        "🎁 BONUS INBEGREPEN"
      ],

    "Free Bonus Download":
      [
        "Téléchargement bonus gratuit",
        "Kostenloser Bonus-Download",
        "Gratis bonusdownload"
      ],

    "DOWNLOAD YOUR FREE BONUS":
      [
        "TÉLÉCHARGER VOTRE BONUS GRATUIT",
        "KOSTENLOSEN BONUS HERUNTERLADEN",
        "DOWNLOAD JE GRATIS BONUS"
      ],


    /*
    =====================================================
    CART
    =====================================================
    */

    "Your Shopping Cart":
      [
        "Votre panier",
        "Ihr Warenkorb",
        "Je winkelwagen"
      ],

    "Loading your cart...":
      [
        "Chargement de votre panier...",
        "Warenkorb wird geladen...",
        "Winkelwagen laden..."
      ],

    "Your cart is currently empty":
      [
        "Votre panier est vide",
        "Ihr Warenkorb ist derzeit leer",
        "Je winkelwagen is leeg"
      ],

    "Continue Shopping":
      [
        "Continuer mes achats",
        "Weiter einkaufen",
        "Verder winkelen"
      ],

    "Order Summary":
      [
        "Récapitulatif de la commande",
        "Bestellübersicht",
        "Besteloverzicht"
      ],

    "Total items":
      [
        "Nombre total d’articles",
        "Gesamtanzahl Artikel",
        "Totaal aantal artikelen"
      ],

    "Total shipment weight":
      [
        "Poids total de l’envoi",
        "Gesamtgewicht der Sendung",
        "Totaal verzendgewicht"
      ],

    "Subtotal":
      [
        "Sous-total",
        "Zwischensumme",
        "Subtotaal"
      ],

    "Continue to Shipping":
      [
        "Continuer vers la livraison",
        "Weiter zum Versand",
        "Doorgaan naar verzending"
      ],


    /*
    =====================================================
    CHECKOUT / PAYMENT
    =====================================================
    */

    "Secure Checkout":
      [
        "Paiement sécurisé",
        "Sicherer Checkout",
        "Veilig afrekenen"
      ],

    "Choose how you want to pay":
      [
        "Choisissez votre mode de paiement",
        "Wählen Sie Ihre Zahlungsmethode",
        "Kies hoe je wilt betalen"
      ],

    "Credit / Debit Card":
      [
        "Carte de crédit / débit",
        "Kredit- / Debitkarte",
        "Creditcard / betaalpas"
      ],

    "Pay with Credit / Debit Card":
      [
        "Payer par carte de crédit / débit",
        "Mit Kredit- / Debitkarte bezahlen",
        "Betalen met kaart"
      ],

    "PayPal Secure Checkout":
      [
        "Paiement sécurisé PayPal",
        "Sicherer PayPal-Checkout",
        "Veilig afrekenen met PayPal"
      ],

    "Download Your Product":
      [
        "Télécharger votre produit",
        "Produkt herunterladen",
        "Download je product"
      ],

    "🎁 Download Your Free Bonus":
      [
        "🎁 Télécharger votre bonus gratuit",
        "🎁 Kostenlosen Bonus herunterladen",
        "🎁 Download je gratis bonus"
      ],

    "Preparing Your Free Bonus...":
      [
        "Préparation de votre bonus gratuit...",
        "Ihr kostenloser Bonus wird vorbereitet...",
        "Je gratis bonus wordt voorbereid..."
      ],

    "Payment Successful ✅":
      [
        "Paiement réussi ✅",
        "Zahlung erfolgreich ✅",
        "Betaling geslaagd ✅"
      ],

    "Your payment has been verified and your digital product is ready.":
      [
        "Votre paiement a été vérifié et votre produit numérique est prêt.",
        "Ihre Zahlung wurde bestätigt und Ihr digitales Produkt ist bereit.",
        "Je betaling is geverifieerd en je digitale product is klaar."
      ],

    "Continue to Secure Card Payment":
      [
        "Continuer vers le paiement sécurisé par carte",
        "Weiter zur sicheren Kartenzahlung",
        "Doorgaan naar veilige kaartbetaling"
      ],

    "Preparing Secure Payment...":
      [
        "Préparation du paiement sécurisé...",
        "Sichere Zahlung wird vorbereitet...",
        "Veilige betaling voorbereiden..."
      ],


    /*
    =====================================================
    CUSTOMER ACCOUNT
    =====================================================
    */

    "My Account":
      [
        "Mon compte",
        "Mein Konto",
        "Mijn account"
      ],

    "My Downloads":
      [
        "Mes téléchargements",
        "Meine Downloads",
        "Mijn downloads"
      ],

    "Refresh Purchases":
      [
        "Actualiser les achats",
        "Käufe aktualisieren",
        "Aankopen vernieuwen"
      ],

    "Download Product":
      [
        "Télécharger le produit",
        "Produkt herunterladen",
        "Product downloaden"
      ],

    "No Digital Purchases Found":
      [
        "Aucun achat numérique trouvé",
        "Keine digitalen Käufe gefunden",
        "Geen digitale aankopen gevonden"
      ],

    "Sign In":
      [
        "Se connecter",
        "Anmelden",
        "Inloggen"
      ],

    "Log In":
      [
        "Se connecter",
        "Anmelden",
        "Inloggen"
      ],

    "Login":
      [
        "Connexion",
        "Anmeldung",
        "Inloggen"
      ],

    "Password":
      [
        "Mot de passe",
        "Passwort",
        "Wachtwoord"
      ],

    "Forgot Password?":
      [
        "Mot de passe oublié ?",
        "Passwort vergessen?",
        "Wachtwoord vergeten?"
      ],

    "Create Account":
      [
        "Créer un compte",
        "Konto erstellen",
        "Account aanmaken"
      ],

    "Sign Up":
      [
        "Créer un compte",
        "Registrieren",
        "Registreren"
      ],

    "Logout":
      [
        "Se déconnecter",
        "Abmelden",
        "Uitloggen"
      ],

    "Log Out":
      [
        "Se déconnecter",
        "Abmelden",
        "Uitloggen"
      ],


    /*
    =====================================================
    COMMON BUTTONS
    =====================================================
    */

    "Search":
      [
        "Rechercher",
        "Suchen",
        "Zoeken"
      ],

    "Submit":
      [
        "Envoyer",
        "Senden",
        "Versturen"
      ],

    "Continue":
      [
        "Continuer",
        "Weiter",
        "Doorgaan"
      ],

    "Cancel":
      [
        "Annuler",
        "Abbrechen",
        "Annuleren"
      ],

    "Close":
      [
        "Fermer",
        "Schließen",
        "Sluiten"
      ],

    "Back":
      [
        "Retour",
        "Zurück",
        "Terug"
      ],

    "Next":
      [
        "Suivant",
        "Weiter",
        "Volgende"
      ],

    "Save":
      [
        "Enregistrer",
        "Speichern",
        "Opslaan"
      ],

    "Loading...":
      [
        "Chargement...",
        "Wird geladen...",
        "Laden..."
      ],


    /*
    =====================================================
    GIFTANA
    =====================================================
    */

    "Welcome from":
      [
        "Bienvenue de la part de",
        "Willkommen von",
        "Welkom van"
      ],

    "Welcome to GiftedGift Empire. I’m Giftana, and I’m happy to have you here. Take your time, explore our products and discover whatever catches your eye. If you need any assistance, we’re always happy to help. Enjoy your time at GiftedGift Empire.":
      [
        "Bienvenue chez GiftedGift Empire. Je suis Giftana et je suis heureuse de vous accueillir. Prenez votre temps, découvrez nos produits et explorez tout ce qui attire votre attention. Si vous avez besoin d’aide, nous sommes toujours heureux de vous accompagner. Profitez de votre visite chez GiftedGift Empire.",
        "Willkommen bei GiftedGift Empire. Ich bin Giftana und freue mich, Sie hier begrüßen zu dürfen. Nehmen Sie sich Zeit, entdecken Sie unsere Produkte und schauen Sie sich alles an, was Ihnen gefällt. Wenn Sie Hilfe benötigen, helfen wir Ihnen gerne weiter. Viel Freude bei GiftedGift Empire.",
        "Welkom bij GiftedGift Empire. Ik ben Giftana en ik ben blij dat je er bent. Neem rustig de tijd, ontdek onze producten en bekijk wat je aanspreekt. Als je hulp nodig hebt, helpen we je graag. Veel plezier bij GiftedGift Empire."
      ],

    "🛍️ Start Shopping":
      [
        "🛍️ Commencer vos achats",
        "🛍️ Einkauf starten",
        "🛍️ Begin met winkelen"
      ],

    "📂 Browse Categories":
      [
        "📂 Parcourir les catégories",
        "📂 Kategorien durchsuchen",
        "📂 Categorieën bekijken"
      ],

    "🎧 Customer Support":
      [
        "🎧 Assistance client",
        "🎧 Kundensupport",
        "🎧 Klantenservice"
      ],

    "🔊 Hear Giftana":
      [
        "🔊 Écouter Giftana",
        "🔊 Giftana anhören",
        "🔊 Luister naar Giftana"
      ],

    "Giftana welcomes you once during your visit. You can replay her voice whenever you like.":
      [
        "Giftana vous accueille une fois pendant votre visite. Vous pouvez réécouter sa voix quand vous le souhaitez.",
        "Giftana begrüßt Sie einmal während Ihres Besuchs. Sie können ihre Stimme jederzeit erneut abspielen.",
        "Giftana verwelkomt je één keer tijdens je bezoek. Je kunt haar stem opnieuw afspelen wanneer je wilt."
      ],

    "🔊 Hear Giftana Again":
      [
        "🔊 Réécouter Giftana",
        "🔊 Giftana erneut anhören",
        "🔊 Luister opnieuw naar Giftana"
      ],

    "Close Giftana":
      [
        "Fermer Giftana",
        "Giftana schließen",
        "Giftana sluiten"
      ],

    "Hear Giftana again":
      [
        "Réécouter Giftana",
        "Giftana erneut anhören",
        "Luister opnieuw naar Giftana"
      ],


    /*
    =====================================================
    COOKIE SETTINGS
    =====================================================
    */

    "Cookie Settings":
      [
        "Paramètres des cookies",
        "Cookie-Einstellungen",
        "Cookie-instellingen"
      ],

    "Your privacy choices":
      [
        "Vos choix de confidentialité",
        "Ihre Datenschutzauswahl",
        "Je privacykeuzes"
      ],

    "Learn more":
      [
        "En savoir plus",
        "Mehr erfahren",
        "Meer informatie"
      ],

    "Accept optional":
      [
        "Accepter les options",
        "Optionale akzeptieren",
        "Optionele accepteren"
      ],

    "Reject optional":
      [
        "Refuser les options",
        "Optionale ablehnen",
        "Optionele weigeren"
      ],

    "Manage choices":
      [
        "Gérer les choix",
        "Auswahl verwalten",
        "Keuzes beheren"
      ],

    "Cookie & privacy settings":
      [
        "Paramètres des cookies et de confidentialité",
        "Cookie- & Datenschutzeinstellungen",
        "Cookie- en privacy-instellingen"
      ],

    "Essential":
      [
        "Essentiel",
        "Erforderlich",
        "Essentieel"
      ],

    "Always active":
      [
        "Toujours actif",
        "Immer aktiv",
        "Altijd actief"
      ],

    "Analytics":
      [
        "Analyse",
        "Analyse",
        "Analyse"
      ],

    "Marketing":
      [
        "Marketing",
        "Marketing",
        "Marketing"
      ],

    "Save my choices":
      [
        "Enregistrer mes choix",
        "Meine Auswahl speichern",
        "Mijn keuzes opslaan"
      ],


    /*
    =====================================================
    COPYRIGHT
    =====================================================
    */

    "© 2026 GiftedGift Empire. All rights reserved.":
      [
        "© 2026 GiftedGift Empire. Tous droits réservés.",
        "© 2026 GiftedGift Empire. Alle Rechte vorbehalten.",
        "© 2026 GiftedGift Empire. Alle rechten voorbehouden."
      ],

    "GiftedGift Empire. All rights reserved.":
      [
        "GiftedGift Empire. Tous droits réservés.",
        "GiftedGift Empire. Alle Rechte vorbehalten.",
        "GiftedGift Empire. Alle rechten voorbehouden."
      ]

  };


  /*
  =========================================================
  STATE
  =========================================================
  */

  const originalText =
    new WeakMap();


  const originalAttributes =
    new WeakMap();


  let currentLanguage =
    getSavedLanguage();


  let observer =
    null;


  let giftanaObserver =
    null;


  /*
  =========================================================
  SAVED LANGUAGE
  =========================================================
  */

  function getSavedLanguage() {

    try {

      const saved =
        localStorage.getItem(
          STORAGE_KEY
        );


      return SUPPORTED.includes(
        saved
      )
        ? saved
        : "en";

    } catch (
      error
    ) {

      return "en";

    }

  }


  function saveLanguage(
    language
  ) {

    try {

      localStorage.setItem(
        STORAGE_KEY,
        language
      );

    } catch (
      error
    ) {

      /*
      Storage may be blocked.
      Language still works for the current page.
      */

    }

  }


  /*
  =========================================================
  NORMALIZE TEXT
  =========================================================
  */

  function normalize(
    value
  ) {

    return String(
      value ||
      ""
    )
      .trim()
      .replace(
        /\s+/g,
        " "
      );

  }


  /*
  =========================================================
  TRANSLATION LOOKUP
  =========================================================
  */

  function lookup(
    value
  ) {

    if (
      currentLanguage ===
      "en"
    ) {

      return value;

    }


    const key =
      normalize(
        value
      );


    const row =
      T[
        key
      ];


    const index =
      LANGUAGE_INDEX[
        currentLanguage
      ];


    if (
      row &&
      index !== undefined &&
      row[
        index
      ]
    ) {

      return row[
        index
      ];

    }


    /*
    =====================================================
    DYNAMIC CART COUNT
    =====================================================
    */


    if (
      /^🛒\s*Cart\s*\(/i.test(
        key
      )
    ) {

      const names = {

        fr:
          "🛒 Panier",

        de:
          "🛒 Warenkorb",

        nl:
          "🛒 Winkelwagen"

      };


      return key.replace(
        /^🛒\s*Cart/i,
        names[
          currentLanguage
        ]
      );

    }


    if (
      /^Cart\s*\(/i.test(
        key
      )
    ) {

      const names = {

        fr:
          "Panier",

        de:
          "Warenkorb",

        nl:
          "Winkelwagen"

      };


      return key.replace(
        /^Cart/i,
        names[
          currentLanguage
        ]
      );

    }


    /*
    =====================================================
    DYNAMIC DAILY INSPIRATION LABELS
    =====================================================
    */

    const dynamicNames = {

      fr: {

        like:
          "❤️ J’aime",

        liked:
          "❤️ Aimé",

        comments:
          "💬 Commentaires",

        published:
          "Publié",

        updated:
          "Mis à jour"

      },


      de: {

        like:
          "❤️ Gefällt mir",

        liked:
          "❤️ Gefällt mir",

        comments:
          "💬 Kommentare",

        published:
          "Veröffentlicht",

        updated:
          "Aktualisiert"

      },


      nl: {

        like:
          "❤️ Leuk",

        liked:
          "❤️ Leuk gevonden",

        comments:
          "💬 Reacties",

        published:
          "Gepubliceerd",

        updated:
          "Bijgewerkt"

      }

    };


    const names =
      dynamicNames[
        currentLanguage
      ];


    if (
      names
    ) {


      if (
        /^❤️\s*Like\s*·\s*\d+$/i.test(
          key
        )
      ) {

        return key.replace(
          /^❤️\s*Like/i,
          names.like
        );

      }


      if (
        /^❤️\s*Liked\s*·\s*\d+$/i.test(
          key
        )
      ) {

        return key.replace(
          /^❤️\s*Liked/i,
          names.liked
        );

      }


      if (
        /^💬\s*Comments\s*·\s*\d+$/i.test(
          key
        )
      ) {

        return key.replace(
          /^💬\s*Comments/i,
          names.comments
        );

      }


      if (
        /^Published\s+/i.test(
          key
        )
      ) {

        return key.replace(
          /^Published/i,
          names.published
        );

      }


      if (
        /^Updated\s+/i.test(
          key
        )
      ) {

        return key.replace(
          /^Updated/i,
          names.updated
        );

      }

    }


    /*
    =====================================================
    DYNAMIC CUSTOMER WELCOME
    =====================================================
    */

    if (
      /^Welcome,\s+/i.test(
        key
      )
    ) {

      const welcome = {

        fr:
          "Bienvenue,",

        de:
          "Willkommen,",

        nl:
          "Welkom,"

      };


      return key.replace(
        /^Welcome,/i,
        welcome[
          currentLanguage
        ]
      );

    }


    return value;

  }


  /*
  =========================================================
  SKIP TECHNICAL CONTENT
  =========================================================
  */

  function shouldSkip(
    node
  ) {

    const parent =
      node?.parentElement;


    if (
      !parent
    ) {

      return true;

    }


    if (
      parent.closest(
        "[data-gge-no-translate]"
      )
    ) {

      return true;

    }


    return Boolean(
      parent.closest(
        "script,style,noscript,code,pre,textarea,svg"
      )
    );

  }


  /*
  =========================================================
  TRANSLATE TEXT NODE
  =========================================================
  */

  function applyTextNode(
    node
  ) {

    if (
      !node ||
      shouldSkip(
        node
      )
    ) {

      return;

    }


    if (
      !originalText.has(
        node
      )
    ) {

      originalText.set(
        node,
        node.nodeValue ||
        ""
      );

    }


    const original =
      originalText.get(
        node
      ) ||
      "";


    const trimmed =
      original.trim();


    if (
      !trimmed
    ) {

      return;

    }


    /*
    Restore original English.
    */


    if (
      currentLanguage ===
      "en"
    ) {

      if (
        node.nodeValue !==
        original
      ) {

        node.nodeValue =
          original;

      }


      return;

    }


    const leading =
      original.match(
        /^\s*/
      )?.[0] ||
      "";


    const trailing =
      original.match(
        /\s*$/
      )?.[0] ||
      "";


    const translated =
      lookup(
        trimmed
      );


    const result =
      leading +
      translated +
      trailing;


    if (
      node.nodeValue !==
      result
    ) {

      node.nodeValue =
        result;

    }

  }


  /*
  =========================================================
  ATTRIBUTES
  =========================================================
  */

  function rememberAttribute(
    element,
    name
  ) {

    let map =
      originalAttributes.get(
        element
      );


    if (
      !map
    ) {

      map =
        new Map();


      originalAttributes.set(
        element,
        map
      );

    }


    if (
      !map.has(
        name
      )
    ) {

      map.set(
        name,
        element.getAttribute(
          name
        )
      );

    }


    return map.get(
      name
    );

  }


  function applyAttributes(
    element
  ) {

    if (
      !element ||
      !element.getAttribute
    ) {

      return;

    }


    if (
      element.closest?.(
        "[data-gge-no-translate]"
      )
    ) {

      return;

    }


    [
      "placeholder",
      "title",
      "aria-label"
    ]
      .forEach(
        name => {


          if (
            !element.hasAttribute(
              name
            )
          ) {

            return;

          }


          const original =
            rememberAttribute(
              element,
              name
            );


          if (
            original ===
            null
          ) {

            return;

          }


          element.setAttribute(
            name,

            currentLanguage ===
              "en"

              ? original

              : lookup(
                  original
                )
          );

        }
      );


    if (
      typeof HTMLInputElement !==
        "undefined" &&
      element instanceof
        HTMLInputElement &&
      [
        "button",
        "submit",
        "reset"
      ].includes(
        element.type
      )
    ) {

      const original =
        rememberAttribute(
          element,
          "value"
        );


      if (
        original !==
        null
      ) {

        element.value =
          currentLanguage ===
            "en"

            ? original

            : lookup(
                original
              );

      }

    }

  }


  /*
  =========================================================
  APPLY LANGUAGE
  =========================================================
  */

  function applyToTree(
    root =
      document.body
  ) {

    if (
      !root
    ) {

      return;

    }


    if (
      root.nodeType ===
      Node.TEXT_NODE
    ) {

      applyTextNode(
        root
      );


      return;

    }


    if (
      root.nodeType !==
        Node.ELEMENT_NODE &&
      root.nodeType !==
        Node.DOCUMENT_NODE &&
      root.nodeType !==
        Node.DOCUMENT_FRAGMENT_NODE
    ) {

      return;

    }


    if (
      root.nodeType ===
      Node.ELEMENT_NODE
    ) {

      applyAttributes(
        root
      );

    }


    root
      .querySelectorAll?.(
        "*"
      )
      .forEach(
        applyAttributes
      );


    const walker =
      document.createTreeWalker(
        root,
        NodeFilter.SHOW_TEXT
      );


    let node;


    while (
      (
        node =
          walker.nextNode()
      )
    ) {

      applyTextNode(
        node
      );

    }


    document.documentElement.lang =
      currentLanguage;


    updateSwitcher();

  }


  /*
=========================================================
CHANGE LANGUAGE
=========================================================
*/

function setLanguage(
  language
) {

  if (
    !SUPPORTED.includes(
      language
    )
  ) {

    return;

  }


  const previousLanguage =
    currentLanguage;


  currentLanguage =
    language;


  saveLanguage(
    language
  );


  /*
  PERFORMANCE FIX

  If the website is already English and
  English is selected again, there is no
  reason to scan the entire page.

  If changing FROM another language back
  to English, the page must still be scanned
  once so the original English is restored.
  */

  if (
    language === "en" &&
    previousLanguage === "en"
  ) {

    document.documentElement.lang =
      "en";


    updateSwitcher();

  } else {

    applyToTree(
      document.body
    );

  }


  window.dispatchEvent(
    new CustomEvent(
      "giftedgift:languagechange",
      {

        detail: {

          language

        }

      }
    )
  );

}


/*
=========================================================
LANGUAGE SELECTOR
=========================================================
*/

function createSwitcher() {

  if (
    document.getElementById(
      "gge-language-switcher"
    )
  ) {

    return;

  }


  const style =
    document.createElement(
      "style"
    );


  style.id =
    "gge-language-styles";


  style.textContent = `

    #gge-language-switcher {

      position:
        fixed;

      top:
        96px;

      right:
        12px;

      z-index:
        2000;

      display:
        flex;

      align-items:
        center;

      gap:
        7px;

      padding:
        7px 10px;

      background:
        rgba(
          255,
          255,
          255,
          0.98
        );

      border:
        1px solid #d6ddea;

      border-radius:
        999px;

      box-shadow:
        0 4px 14px
        rgba(
          0,
          0,
          0,
          0.12
        );

      font-family:
        Arial,
        Helvetica,
        sans-serif;

      transition:
        opacity 0.18s ease,
        visibility 0.18s ease;

    }


    #gge-language-switcher.gge-language-hidden {

      opacity:
        0;

      visibility:
        hidden;

      pointer-events:
        none;

    }


    #gge-language-switcher
    .gge-language-icon {

      font-size:
        16px;

      line-height:
        1;

    }


    #gge-language-select {

      border:
        0;

      outline:
        0;

      background:
        transparent;

      color:
        #123a8c;

      font:
        inherit;

      font-size:
        13px;

      font-weight:
        800;

      cursor:
        pointer;

      padding:
        3px 2px;

    }


    #gge-language-select:focus-visible {

      outline:
        2px solid #f2bd16;

      outline-offset:
        3px;

      border-radius:
        5px;

    }


    @media
    (max-width: 720px) {

      #gge-language-switcher {

        top:
          82px;

        right:
          10px;

        padding:
          6px 9px;

      }

    }

  `;


  document.head.appendChild(
    style
  );


  const wrapper =
    document.createElement(
      "div"
    );


  wrapper.id =
    "gge-language-switcher";


  wrapper.setAttribute(
    "data-gge-no-translate",
    "true"
  );


  wrapper.setAttribute(
    "aria-label",
    "Language selector"
  );


  wrapper.innerHTML = `

    <span
      class="gge-language-icon"
      aria-hidden="true"
    >
      🌐
    </span>

    <select
      id="gge-language-select"
      aria-label="Language"
    >

      <option value="en">
        EN · English
      </option>

      <option value="fr">
        FR · Français
      </option>

      <option value="de">
        DE · Deutsch
      </option>

      <option value="nl">
        NL · Nederlands
      </option>

    </select>

  `;


  const select =
    wrapper.querySelector(
      "#gge-language-select"
    );


  select.value =
    currentLanguage;


  select.addEventListener(
    "change",
    function () {

      setLanguage(
        select.value
      );

    }
  );


  document.body.appendChild(
    wrapper
  );

}


/*
=========================================================
UPDATE SELECTOR
=========================================================
*/

function updateSwitcher() {

  const select =
    document.getElementById(
      "gge-language-select"
    );


  if (
    select &&
    select.value !==
      currentLanguage
  ) {

    select.value =
      currentLanguage;

  }

}


/*
=========================================================
GIFTANA POPUP PROTECTION

Hide the floating language selector while the
Giftana welcome popup is open.
=========================================================
*/

function updateGiftanaSwitcherVisibility() {

  const switcher =
    document.getElementById(
      "gge-language-switcher"
    );


  if (
    !switcher
  ) {

    return;

  }


  const overlay =
    document.getElementById(
      "giftana-overlay"
    );


  const giftanaOpen =
    Boolean(
      overlay &&
      overlay.classList.contains(
        "show"
      )
    );


  switcher.classList.toggle(
    "gge-language-hidden",
    giftanaOpen
  );

}


function watchGiftana() {

  const overlay =
    document.getElementById(
      "giftana-overlay"
    );


  updateGiftanaSwitcherVisibility();


  if (
    !overlay
  ) {

    return;

  }


  if (
    giftanaObserver
  ) {

    giftanaObserver.disconnect();

  }


  giftanaObserver =
    new MutationObserver(
      function () {

        updateGiftanaSwitcherVisibility();

      }
    );


  giftanaObserver.observe(
    overlay,
    {

      attributes:
        true,

      attributeFilter:
        [
          "class"
        ]

    }
  );

}


/*
=========================================================
DYNAMIC CONTENT OBSERVER

Performance rule:

English is the original website language.
When English is active, newly-added website content
must NOT be scanned and translated again.

French, German and Dutch still translate dynamic
content normally.
=========================================================
*/

function startObserver() {

  if (
    !document.body
  ) {

    return;

  }


  if (
    observer
  ) {

    observer.disconnect();

  }


  observer =
    new MutationObserver(
      function (
        mutations
      ) {

        /*
        IMPORTANT PERFORMANCE FIX

        English content is already correct.

        Long Blog articles can contain hundreds
        or thousands of DOM nodes. Reprocessing
        every newly-added element while English
        is selected wastes browser resources and
        can freeze lower-powered devices.
        */

        if (
          currentLanguage !==
          "en"
        ) {

          mutations.forEach(
            function (
              mutation
            ) {

              mutation.addedNodes
                .forEach(
                  function (
                    node
                  ) {

                    applyToTree(
                      node
                    );

                  }
                );

            }
          );

        }


        /*
        Giftana may be inserted dynamically.
        This small check can continue regardless
        of the selected language.
        */

        if (
          document.getElementById(
            "giftana-overlay"
          ) &&
          !giftanaObserver
        ) {

          watchGiftana();

        }

      }
    );


  observer.observe(
    document.body,
    {

      childList:
        true,

      subtree:
        true

    }
  );

}


/*
=========================================================
START
=========================================================
*/

function initialise() {

  createSwitcher();


  /*
  PERFORMANCE FIX

  English is already the original website
  language.

  Do not walk through every paragraph,
  heading, product, Blog article section,
  comment and dynamically generated item
  when the visitor is using English.

  French, German and Dutch still receive
  the complete translation scan.
  */

  document.documentElement.lang =
    currentLanguage;


  updateSwitcher();


  if (
    currentLanguage !==
    "en"
  ) {

    applyToTree(
      document.body
    );

  }


  watchGiftana();


  startObserver();

}


/*
=========================================================
PUBLIC LANGUAGE API
=========================================================
*/

window.GiftedGiftLanguage = {

  get:
    function () {

      return currentLanguage;

    },


  set:
    setLanguage,


  refresh:
    function () {

      /*
      Do not perform an expensive full-page
      scan merely to "refresh" English.

      Other languages still need the scan.
      */

      if (
        currentLanguage ===
        "en"
      ) {

        document.documentElement.lang =
          "en";


        updateSwitcher();


        return;

      }


      applyToTree(
        document.body
      );

    },


  supported:
    function () {

      return [
        ...SUPPORTED
      ];

    }

};


/*
=========================================================
INITIALISE
=========================================================
*/

if (
  document.readyState ===
  "loading"
) {

  document.addEventListener(
    "DOMContentLoaded",
    initialise,
    {
      once:
        true
    }
  );

} else {

  initialise();

}

})();
