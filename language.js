/*
=========================================================
GIFTEDGIFT EMPIRE
MULTI-LANGUAGE SYSTEM

Languages:
EN = English
FR = French
DE = German
NL = Dutch
=========================================================
*/

(function () {

  "use strict";


  if (
    window.__GiftedGiftLanguageLoaded
  ) {

    return;

  }


  window.__GiftedGiftLanguageLoaded =
    true;


  const STORAGE_KEY =
    "giftedgift_language";


  const SUPPORTED_LANGUAGES =
    [
      "en",
      "fr",
      "de",
      "nl"
    ];


  /*
  =========================================================
  TRANSLATIONS
  =========================================================
  */


  const translations = {


    /*
    =====================================================
    FRENCH
    =====================================================
    */


    fr: {

      "Home":
        "Accueil",

      "Shop":
        "Boutique",

      "Categories":
        "Catégories",

      "Daily Inspiration":
        "Inspiration du jour",

      "Blog":
        "Blog",

      "Deals":
        "Offres",

      "About":
        "À propos",

      "Contact":
        "Contact",

      "Cart":
        "Panier",

      "🛒 Cart":
        "🛒 Panier",

      "All Products":
        "Tous les produits",

      "Shop All Products":
        "Voir tous les produits",

      "Shop by Category":
        "Acheter par catégorie",

      "Explore Our Picks":
        "Découvrez notre sélection",

      "Loading categories...":
        "Chargement des catégories...",

      "Loading products...":
        "Chargement des produits...",

      "Useful Products":
        "Produits utiles",

      "Trusted Recommendations":
        "Recommandations de confiance",

      "Best Deals":
        "Meilleures offres",

      "Shop with Confidence":
        "Achetez en toute confiance",

      "Handpicked for You":
        "Sélectionnés pour vous",

      "🔥 Featured Products":
        "🔥 Produits à la une",

      "View All →":
        "Voir tout →",

      "More to Discover":
        "Plus à découvrir",

      "Explore GiftedGift Empire":
        "Découvrez GiftedGift Empire",

      "Get Inspired":
        "Inspirez-vous",

      "View Deals":
        "Voir les offres",

      "Read Blog":
        "Lire le blog",

      "African Foodstuffs":
        "Produits alimentaires africains",

      "Shop Foodstuffs":
        "Acheter des produits alimentaires",

      "Opportunities":
        "Opportunités",

      "Work With GiftedGift Empire":
        "Collaborez avec GiftedGift Empire",

      "Earn With Us":
        "Gagnez avec nous",

      "Join Affiliate Program →":
        "Rejoindre le programme d’affiliation →",

      "Advertise With Us":
        "Faites de la publicité avec nous",

      "Apply to Advertise →":
        "Faire une demande de publicité →",

      "Sell With Us":
        "Vendez avec nous",

      "Become a Creator →":
        "Devenir créateur →",

      "About GiftedGift Empire":
        "À propos de GiftedGift Empire",

      "About Us":
        "À propos de nous",

      "Contact Us":
        "Nous contacter",

      "Customer Care":
        "Service client",

      "Customer Support":
        "Assistance client",

      "Customer Service & Support":
        "Service client et assistance",

      "Customer Service & Support →":
        "Service client et assistance →",

      "Need Help?":
        "Besoin d’aide ?",

      "Join the GiftedGift Empire Newsletter":
        "Rejoignez la newsletter GiftedGift Empire",

      "Your Name":
        "Votre nom",

      "Your Name *":
        "Votre nom *",

      "Email Address":
        "Adresse e-mail",

      "Email Address *":
        "Adresse e-mail *",

      "Website":
        "Site web",

      "Subscribe":
        "S’abonner",

      "Privacy Policy":
        "Politique de confidentialité",

      "Returns & Refunds":
        "Retours et remboursements",

      "Shipping Policy":
        "Politique d’expédition",

      "Terms & Conditions":
        "Conditions générales",

      "Legal Notice":
        "Mentions légales",

      "Product Type":
        "Type de produit",

      "Physical":
        "Physique",

      "Digital":
        "Numérique",

      "Creator Marketplace":
        "Marché des créateurs",

      "Affiliate":
        "Affiliation",

      "All Categories":
        "Toutes les catégories",

      "Home & Living":
        "Maison et quotidien",

      "Fashion & Accessories":
        "Mode et accessoires",

      "Useful Finds":
        "Trouvailles utiles",

      "Beauty & Lifestyle":
        "Beauté et art de vivre",

      "Deals & Special Offers":
        "Offres et promotions",

      "Current Deals":
        "Offres en cours",

      "Loading current deals...":
        "Chargement des offres...",

      "No active deals right now":
        "Aucune offre active pour le moment",

      "Shop Now":
        "Acheter maintenant",

      "Health & Wellness":
        "Santé et bien-être",

      "Digital Products":
        "Produits numériques",

      "Our Mission":
        "Notre mission",

      "Contact GiftedGift Empire":
        "Contacter GiftedGift Empire",

      "Business & General Enquiries":
        "Demandes commerciales et générales",

      "Need Customer Support?":
        "Besoin d’assistance client ?",

      "← Back to Shop":
        "← Retour à la boutique",

      "Loading product...":
        "Chargement du produit...",

      "Ready to Wear":
        "Prêt-à-porter",

      "Sew on Demand":
        "Confection sur demande",

      "Size":
        "Taille",

      "Select size":
        "Choisir une taille",

      "Colour":
        "Couleur",

      "Select colour":
        "Choisir une couleur",

      "Quantity":
        "Quantité",

      "Add to Cart":
        "Ajouter au panier",

      "🛒 View Cart & Checkout":
        "🛒 Voir le panier et passer au paiement",

      "OR":
        "OU",

      "Complete Purchase on WhatsApp":
        "Finaliser l’achat sur WhatsApp",

      "Full Name":
        "Nom complet",

      "Full Name *":
        "Nom complet *",

      "Phone Number":
        "Numéro de téléphone",

      "Delivery Address":
        "Adresse de livraison",

      "Postal Code":
        "Code postal",

      "City":
        "Ville",

      "Country":
        "Pays",

      "Customer Reviews":
        "Avis clients",

      "Reviews":
        "Avis",

      "Leave a Review":
        "Laisser un avis",

      "Submit Review":
        "Envoyer l’avis",

      "← Home":
        "← Accueil",

      "Product Total":
        "Total des produits",

      "Delivery Details":
        "Informations de livraison",

      "Latest From the Blog":
        "Derniers articles du blog",

      "Loading articles...":
        "Chargement des articles...",

      "← Back to Blog":
        "← Retour au blog",

      "View Product":
        "Voir le produit",

      "Submit a Support Request":
        "Envoyer une demande d’assistance",

      "Support Category *":
        "Catégorie d’assistance *",

      "Select a category":
        "Choisir une catégorie",

      "Order":
        "Commande",

      "Payment":
        "Paiement",

      "Delivery / Shipping":
        "Livraison / Expédition",

      "Refund / Return":
        "Remboursement / Retour",

      "Digital Download":
        "Téléchargement numérique",

      "Account / Login":
        "Compte / Connexion",

      "Something Else":
        "Autre chose",

      "Subject *":
        "Objet *",

      "Message *":
        "Message *",

      "Frequently Asked Questions":
        "Questions fréquentes",

      "Visit Shop":
        "Visiter la boutique",

      "Visit Shop →":
        "Visiter la boutique →",

      "Loading digital product...":
        "Chargement du produit numérique...",

      "Featured":
        "À la une",

      "BUY NOW":
        "ACHETER MAINTENANT",

      "Secure Digital Purchase":
        "Achat numérique sécurisé",

      "Share This Product":
        "Partager ce produit",

      "Copy Link":
        "Copier le lien",

      "Share":
        "Partager",

      "🎁 FREE DIGITAL DOWNLOAD":
        "🎁 TÉLÉCHARGEMENT NUMÉRIQUE GRATUIT",

      "Free Digital Product":
        "Produit numérique gratuit",

      "FREE":
        "GRATUIT",

      "Get Your Free Copy":
        "Obtenez votre exemplaire gratuit",

      "GET MY FREE DOWNLOAD":
        "OBTENIR MON TÉLÉCHARGEMENT GRATUIT",

      "Your Free Product Is Ready!":
        "Votre produit gratuit est prêt !",

      "DOWNLOAD YOUR FREE PRODUCT":
        "TÉLÉCHARGER VOTRE PRODUIT GRATUIT",

      "🎁 BONUS INCLUDED":
        "🎁 BONUS INCLUS",

      "Free Bonus Download":
        "Téléchargement bonus gratuit",

      "DOWNLOAD YOUR FREE BONUS":
        "TÉLÉCHARGER VOTRE BONUS GRATUIT",

      "Your Shopping Cart":
        "Votre panier",

      "Loading your cart...":
        "Chargement de votre panier...",

      "Continue Shopping":
        "Continuer mes achats",

      "Order Summary":
        "Récapitulatif de la commande",

      "Subtotal":
        "Sous-total",

      "Continue to Shipping":
        "Continuer vers la livraison",

      "Secure Checkout":
        "Paiement sécurisé",

      "Choose how you want to pay":
        "Choisissez votre mode de paiement",

      "Credit / Debit Card":
        "Carte de crédit / débit",

      "Pay with Credit / Debit Card":
        "Payer par carte",

      "PayPal Secure Checkout":
        "Paiement sécurisé PayPal",

      "Download Your Product":
        "Télécharger votre produit",

      "🎁 Download Your Free Bonus":
        "🎁 Télécharger votre bonus gratuit",

      "Payment Successful ✅":
        "Paiement réussi ✅",

      "My Account":
        "Mon compte",

      "My Downloads":
        "Mes téléchargements",

      "Download Product":
        "Télécharger le produit",

      "Sign In":
        "Se connecter",

      "Login":
        "Connexion",

      "Password":
        "Mot de passe",

      "Forgot Password?":
        "Mot de passe oublié ?",

      "Create Account":
        "Créer un compte",

      "Sign Up":
        "Créer un compte",

      "Logout":
        "Se déconnecter",

      "Search":
        "Rechercher",

      "Submit":
        "Envoyer",

      "Continue":
        "Continuer",

      "Cancel":
        "Annuler",

      "Save":
        "Enregistrer",

      "Loading...":
        "Chargement...",

      "© 2026 GiftedGift Empire. All rights reserved.":
        "© 2026 GiftedGift Empire. Tous droits réservés."

    },


    /*
    =====================================================
    GERMAN
    =====================================================
    */


    de: {

      "Home":
        "Startseite",

      "Shop":
        "Shop",

      "Categories":
        "Kategorien",

      "Daily Inspiration":
        "Tägliche Inspiration",

      "Blog":
        "Blog",

      "Deals":
        "Angebote",

      "About":
        "Über uns",

      "Contact":
        "Kontakt",

      "Cart":
        "Warenkorb",

      "🛒 Cart":
        "🛒 Warenkorb",

      "All Products":
        "Alle Produkte",

      "Shop All Products":
        "Alle Produkte ansehen",

      "Shop by Category":
        "Nach Kategorie einkaufen",

      "Explore Our Picks":
        "Unsere Auswahl entdecken",

      "Loading categories...":
        "Kategorien werden geladen...",

      "Loading products...":
        "Produkte werden geladen...",

      "Useful Products":
        "Nützliche Produkte",

      "Trusted Recommendations":
        "Vertrauenswürdige Empfehlungen",

      "Best Deals":
        "Beste Angebote",

      "Shop with Confidence":
        "Sicher einkaufen",

      "Handpicked for You":
        "Für Sie ausgewählt",

      "🔥 Featured Products":
        "🔥 Empfohlene Produkte",

      "View All →":
        "Alle ansehen →",

      "More to Discover":
        "Mehr entdecken",

      "Explore GiftedGift Empire":
        "GiftedGift Empire entdecken",

      "Get Inspired":
        "Inspiration entdecken",

      "View Deals":
        "Angebote ansehen",

      "Read Blog":
        "Blog lesen",

      "African Foodstuffs":
        "Afrikanische Lebensmittel",

      "Shop Foodstuffs":
        "Lebensmittel kaufen",

      "Opportunities":
        "Möglichkeiten",

      "Work With GiftedGift Empire":
        "Mit GiftedGift Empire zusammenarbeiten",

      "Earn With Us":
        "Mit uns verdienen",

      "Join Affiliate Program →":
        "Affiliate-Programm beitreten →",

      "Advertise With Us":
        "Bei uns werben",

      "Apply to Advertise →":
        "Werbung beantragen →",

      "Sell With Us":
        "Bei uns verkaufen",

      "Become a Creator →":
        "Creator werden →",

      "About GiftedGift Empire":
        "Über GiftedGift Empire",

      "About Us":
        "Über uns",

      "Contact Us":
        "Kontaktieren Sie uns",

      "Customer Care":
        "Kundenservice",

      "Customer Support":
        "Kundensupport",

      "Customer Service & Support":
        "Kundenservice & Support",

      "Need Help?":
        "Brauchen Sie Hilfe?",

      "Join the GiftedGift Empire Newsletter":
        "GiftedGift Empire Newsletter abonnieren",

      "Your Name":
        "Ihr Name",

      "Your Name *":
        "Ihr Name *",

      "Email Address":
        "E-Mail-Adresse",

      "Email Address *":
        "E-Mail-Adresse *",

      "Website":
        "Webseite",

      "Subscribe":
        "Abonnieren",

      "Privacy Policy":
        "Datenschutzerklärung",

      "Returns & Refunds":
        "Rückgabe & Erstattung",

      "Shipping Policy":
        "Versandrichtlinie",

      "Terms & Conditions":
        "Allgemeine Geschäftsbedingungen",

      "Legal Notice":
        "Impressum",

      "Product Type":
        "Produkttyp",

      "Physical":
        "Physisch",

      "Digital":
        "Digital",

      "Creator Marketplace":
        "Creator-Marktplatz",

      "Affiliate":
        "Affiliate",

      "All Categories":
        "Alle Kategorien",

      "Home & Living":
        "Wohnen & Alltag",

      "Fashion & Accessories":
        "Mode & Accessoires",

      "Useful Finds":
        "Nützliche Entdeckungen",

      "Beauty & Lifestyle":
        "Beauty & Lifestyle",

      "Deals & Special Offers":
        "Angebote & Aktionen",

      "Current Deals":
        "Aktuelle Angebote",

      "Loading current deals...":
        "Angebote werden geladen...",

      "No active deals right now":
        "Derzeit keine aktiven Angebote",

      "Shop Now":
        "Jetzt einkaufen",

      "Health & Wellness":
        "Gesundheit & Wellness",

      "Digital Products":
        "Digitale Produkte",

      "Our Mission":
        "Unsere Mission",

      "Contact GiftedGift Empire":
        "GiftedGift Empire kontaktieren",

      "Business & General Enquiries":
        "Geschäftliche & allgemeine Anfragen",

      "Need Customer Support?":
        "Benötigen Sie Kundensupport?",

      "← Back to Shop":
        "← Zurück zum Shop",

      "Loading product...":
        "Produkt wird geladen...",

      "Ready to Wear":
        "Konfektionskleidung",

      "Sew on Demand":
        "Anfertigung auf Bestellung",

      "Size":
        "Größe",

      "Select size":
        "Größe auswählen",

      "Colour":
        "Farbe",

      "Select colour":
        "Farbe auswählen",

      "Quantity":
        "Menge",

      "Add to Cart":
        "In den Warenkorb",

      "🛒 View Cart & Checkout":
        "🛒 Warenkorb & Kasse",

      "OR":
        "ODER",

      "Complete Purchase on WhatsApp":
        "Kauf über WhatsApp abschließen",

      "Full Name":
        "Vollständiger Name",

      "Full Name *":
        "Vollständiger Name *",

      "Phone Number":
        "Telefonnummer",

      "Delivery Address":
        "Lieferadresse",

      "Postal Code":
        "Postleitzahl",

      "City":
        "Stadt",

      "Country":
        "Land",

      "Customer Reviews":
        "Kundenbewertungen",

      "Reviews":
        "Bewertungen",

      "Leave a Review":
        "Bewertung abgeben",

      "Submit Review":
        "Bewertung senden",

      "← Home":
        "← Startseite",

      "Product Total":
        "Produktsumme",

      "Delivery Details":
        "Lieferdetails",

      "Latest From the Blog":
        "Neueste Blogbeiträge",

      "Loading articles...":
        "Artikel werden geladen...",

      "← Back to Blog":
        "← Zurück zum Blog",

      "View Product":
        "Produkt ansehen",

      "Submit a Support Request":
        "Support-Anfrage senden",

      "Support Category *":
        "Support-Kategorie *",

      "Select a category":
        "Kategorie auswählen",

      "Order":
        "Bestellung",

      "Payment":
        "Zahlung",

      "Delivery / Shipping":
        "Lieferung / Versand",

      "Refund / Return":
        "Erstattung / Rückgabe",

      "Digital Download":
        "Digitaler Download",

      "Account / Login":
        "Konto / Anmeldung",

      "Something Else":
        "Etwas anderes",

      "Subject *":
        "Betreff *",

      "Message *":
        "Nachricht *",

      "Frequently Asked Questions":
        "Häufig gestellte Fragen",

      "Visit Shop":
        "Shop besuchen",

      "Visit Shop →":
        "Shop besuchen →",

      "Loading digital product...":
        "Digitales Produkt wird geladen...",

      "Featured":
        "Empfohlen",

      "BUY NOW":
        "JETZT KAUFEN",

      "Secure Digital Purchase":
        "Sicherer digitaler Kauf",

      "Share This Product":
        "Dieses Produkt teilen",

      "Copy Link":
        "Link kopieren",

      "Share":
        "Teilen",

      "🎁 FREE DIGITAL DOWNLOAD":
        "🎁 KOSTENLOSER DIGITALER DOWNLOAD",

      "Free Digital Product":
        "Kostenloses digitales Produkt",

      "FREE":
        "KOSTENLOS",

      "Get Your Free Copy":
        "Kostenloses Exemplar erhalten",

      "GET MY FREE DOWNLOAD":
        "KOSTENLOSEN DOWNLOAD ERHALTEN",

      "Your Free Product Is Ready!":
        "Ihr kostenloses Produkt ist bereit!",

      "DOWNLOAD YOUR FREE PRODUCT":
        "KOSTENLOSES PRODUKT HERUNTERLADEN",

      "🎁 BONUS INCLUDED":
        "🎁 BONUS ENTHALTEN",

      "Free Bonus Download":
        "Kostenloser Bonus-Download",

      "DOWNLOAD YOUR FREE BONUS":
        "KOSTENLOSEN BONUS HERUNTERLADEN",

      "Your Shopping Cart":
        "Ihr Warenkorb",

      "Loading your cart...":
        "Warenkorb wird geladen...",

      "Continue Shopping":
        "Weiter einkaufen",

      "Order Summary":
        "Bestellübersicht",

      "Subtotal":
        "Zwischensumme",

      "Continue to Shipping":
        "Weiter zum Versand",

      "Secure Checkout":
        "Sicherer Checkout",

      "Choose how you want to pay":
        "Wählen Sie Ihre Zahlungsmethode",

      "Credit / Debit Card":
        "Kredit- / Debitkarte",

      "Pay with Credit / Debit Card":
        "Mit Kredit- / Debitkarte bezahlen",

      "PayPal Secure Checkout":
        "Sicherer PayPal-Checkout",

      "Download Your Product":
        "Produkt herunterladen",

      "🎁 Download Your Free Bonus":
        "🎁 Kostenlosen Bonus herunterladen",

      "Payment Successful ✅":
        "Zahlung erfolgreich ✅",

      "My Account":
        "Mein Konto",

      "My Downloads":
        "Meine Downloads",

      "Download Product":
        "Produkt herunterladen",

      "Sign In":
        "Anmelden",

      "Login":
        "Anmeldung",

      "Password":
        "Passwort",

      "Forgot Password?":
        "Passwort vergessen?",

      "Create Account":
        "Konto erstellen",

      "Sign Up":
        "Registrieren",

      "Logout":
        "Abmelden",

      "Search":
        "Suchen",

      "Submit":
        "Senden",

      "Continue":
        "Weiter",

      "Cancel":
        "Abbrechen",

      "Save":
        "Speichern",

      "Loading...":
        "Wird geladen...",

      "© 2026 GiftedGift Empire. All rights reserved.":
        "© 2026 GiftedGift Empire. Alle Rechte vorbehalten."

    },


    /*
    =====================================================
    DUTCH
    =====================================================
    */


    nl: {

      "Home":
        "Home",

      "Shop":
        "Winkel",

      "Categories":
        "Categorieën",

      "Daily Inspiration":
        "Dagelijkse inspiratie",

      "Blog":
        "Blog",

      "Deals":
        "Aanbiedingen",

      "About":
        "Over ons",

      "Contact":
        "Contact",

      "Cart":
        "Winkelwagen",

      "🛒 Cart":
        "🛒 Winkelwagen",

      "All Products":
        "Alle producten",

      "Shop All Products":
        "Alle producten bekijken",

      "Shop by Category":
        "Winkelen per categorie",

      "Explore Our Picks":
        "Ontdek onze selectie",

      "Loading categories...":
        "Categorieën laden...",

      "Loading products...":
        "Producten laden...",

      "Useful Products":
        "Handige producten",

      "Trusted Recommendations":
        "Betrouwbare aanbevelingen",

      "Best Deals":
        "Beste aanbiedingen",

      "Shop with Confidence":
        "Winkel met vertrouwen",

      "Handpicked for You":
        "Voor jou geselecteerd",

      "🔥 Featured Products":
        "🔥 Uitgelichte producten",

      "View All →":
        "Alles bekijken →",

      "More to Discover":
        "Meer ontdekken",

      "Explore GiftedGift Empire":
        "Ontdek GiftedGift Empire",

      "Get Inspired":
        "Laat je inspireren",

      "View Deals":
        "Bekijk aanbiedingen",

      "Read Blog":
        "Lees blog",

      "African Foodstuffs":
        "Afrikaanse levensmiddelen",

      "Shop Foodstuffs":
        "Levensmiddelen kopen",

      "Opportunities":
        "Mogelijkheden",

      "Work With GiftedGift Empire":
        "Werk met GiftedGift Empire",

      "Earn With Us":
        "Verdien met ons",

      "Join Affiliate Program →":
        "Word affiliate →",

      "Advertise With Us":
        "Adverteer bij ons",

      "Apply to Advertise →":
        "Aanmelden om te adverteren →",

      "Sell With Us":
        "Verkoop bij ons",

      "Become a Creator →":
        "Word creator →",

      "About GiftedGift Empire":
        "Over GiftedGift Empire",

      "About Us":
        "Over ons",

      "Contact Us":
        "Neem contact op",

      "Customer Care":
        "Klantenservice",

      "Customer Support":
        "Klantenondersteuning",

      "Customer Service & Support":
        "Klantenservice & ondersteuning",

      "Need Help?":
        "Hulp nodig?",

      "Join the GiftedGift Empire Newsletter":
        "Schrijf je in voor de GiftedGift Empire nieuwsbrief",

      "Your Name":
        "Je naam",

      "Your Name *":
        "Je naam *",

      "Email Address":
        "E-mailadres",

      "Email Address *":
        "E-mailadres *",

      "Website":
        "Website",

      "Subscribe":
        "Inschrijven",

      "Privacy Policy":
        "Privacybeleid",

      "Returns & Refunds":
        "Retouren & terugbetalingen",

      "Shipping Policy":
        "Verzendbeleid",

      "Terms & Conditions":
        "Algemene voorwaarden",

      "Legal Notice":
        "Juridische informatie",

      "Product Type":
        "Producttype",

      "Physical":
        "Fysiek",

      "Digital":
        "Digitaal",

      "Creator Marketplace":
        "Creator-marktplaats",

      "Affiliate":
        "Affiliate",

      "All Categories":
        "Alle categorieën",

      "Home & Living":
        "Wonen & leven",

      "Fashion & Accessories":
        "Mode & accessoires",

      "Useful Finds":
        "Handige vondsten",

      "Beauty & Lifestyle":
        "Beauty & lifestyle",

      "Deals & Special Offers":
        "Aanbiedingen & acties",

      "Current Deals":
        "Actuele aanbiedingen",

      "Loading current deals...":
        "Aanbiedingen laden...",

      "No active deals right now":
        "Momenteel geen actieve aanbiedingen",

      "Shop Now":
        "Nu winkelen",

      "Health & Wellness":
        "Gezondheid & wellness",

      "Digital Products":
        "Digitale producten",

      "Our Mission":
        "Onze missie",

      "Contact GiftedGift Empire":
        "Contact opnemen met GiftedGift Empire",

      "Business & General Enquiries":
        "Zakelijke & algemene vragen",

      "Need Customer Support?":
        "Klantenservice nodig?",

      "← Back to Shop":
        "← Terug naar de winkel",

      "Loading product...":
        "Product laden...",

      "Ready to Wear":
        "Ready-to-wear",

      "Sew on Demand":
        "Op bestelling gemaakt",

      "Size":
        "Maat",

      "Select size":
        "Selecteer maat",

      "Colour":
        "Kleur",

      "Select colour":
        "Selecteer kleur",

      "Quantity":
        "Aantal",

      "Add to Cart":
        "Toevoegen aan winkelwagen",

      "🛒 View Cart & Checkout":
        "🛒 Winkelwagen & afrekenen",

      "OR":
        "OF",

      "Complete Purchase on WhatsApp":
        "Aankoop afronden via WhatsApp",

      "Full Name":
        "Volledige naam",

      "Full Name *":
        "Volledige naam *",

      "Phone Number":
        "Telefoonnummer",

      "Delivery Address":
        "Bezorgadres",

      "Postal Code":
        "Postcode",

      "City":
        "Plaats",

      "Country":
        "Land",

      "Customer Reviews":
        "Klantbeoordelingen",

      "Reviews":
        "Beoordelingen",

      "Leave a Review":
        "Beoordeling achterlaten",

      "Submit Review":
        "Beoordeling versturen",

      "← Home":
        "← Home",

      "Product Total":
        "Producttotaal",

      "Delivery Details":
        "Bezorggegevens",

      "Latest From the Blog":
        "Nieuwste blogberichten",

      "Loading articles...":
        "Artikelen laden...",

      "← Back to Blog":
        "← Terug naar blog",

      "View Product":
        "Product bekijken",

      "Submit a Support Request":
        "Supportverzoek indienen",

      "Support Category *":
        "Supportcategorie *",

      "Select a category":
        "Selecteer een categorie",

      "Order":
        "Bestelling",

      "Payment":
        "Betaling",

      "Delivery / Shipping":
        "Bezorging / verzending",

      "Refund / Return":
        "Terugbetaling / retour",

      "Digital Download":
        "Digitale download",

      "Account / Login":
        "Account / inloggen",

      "Something Else":
        "Iets anders",

      "Subject *":
        "Onderwerp *",

      "Message *":
        "Bericht *",

      "Frequently Asked Questions":
        "Veelgestelde vragen",

      "Visit Shop":
        "Bezoek winkel",

      "Visit Shop →":
        "Bezoek winkel →",

      "Loading digital product...":
        "Digitaal product laden...",

      "Featured":
        "Uitgelicht",

      "BUY NOW":
        "NU KOPEN",

      "Secure Digital Purchase":
        "Veilige digitale aankoop",

      "Share This Product":
        "Deel dit product",

      "Copy Link":
        "Link kopiëren",

      "Share":
        "Delen",

      "🎁 FREE DIGITAL DOWNLOAD":
        "🎁 GRATIS DIGITALE DOWNLOAD",

      "Free Digital Product":
        "Gratis digitaal product",

      "FREE":
        "GRATIS",

      "Get Your Free Copy":
        "Ontvang je gratis exemplaar",

      "GET MY FREE DOWNLOAD":
        "ONTVANG MIJN GRATIS DOWNLOAD",

      "Your Free Product Is Ready!":
        "Je gratis product is klaar!",

      "DOWNLOAD YOUR FREE PRODUCT":
        "DOWNLOAD JE GRATIS PRODUCT",

      "🎁 BONUS INCLUDED":
        "🎁 BONUS INBEGREPEN",

      "Free Bonus Download":
        "Gratis bonusdownload",

      "DOWNLOAD YOUR FREE BONUS":
        "DOWNLOAD JE GRATIS BONUS",

      "Your Shopping Cart":
        "Je winkelwagen",

      "Loading your cart...":
        "Winkelwagen laden...",

      "Continue Shopping":
        "Verder winkelen",

      "Order Summary":
        "Besteloverzicht",

      "Subtotal":
        "Subtotaal",

      "Continue to Shipping":
        "Doorgaan naar verzending",

      "Secure Checkout":
        "Veilig afrekenen",

      "Choose how you want to pay":
        "Kies hoe je wilt betalen",

      "Credit / Debit Card":
        "Creditcard / betaalpas",

      "Pay with Credit / Debit Card":
        "Betalen met kaart",

      "PayPal Secure Checkout":
        "Veilig afrekenen met PayPal",

      "Download Your Product":
        "Download je product",

      "🎁 Download Your Free Bonus":
        "🎁 Download je gratis bonus",

      "Payment Successful ✅":
        "Betaling geslaagd ✅",

      "My Account":
        "Mijn account",

      "My Downloads":
        "Mijn downloads",

      "Download Product":
        "Product downloaden",

      "Sign In":
        "Inloggen",

      "Login":
        "Inloggen",

      "Password":
        "Wachtwoord",

      "Forgot Password?":
        "Wachtwoord vergeten?",

      "Create Account":
        "Account aanmaken",

      "Sign Up":
        "Registreren",

      "Logout":
        "Uitloggen",

      "Search":
        "Zoeken",

      "Submit":
        "Versturen",

      "Continue":
        "Doorgaan",

      "Cancel":
        "Annuleren",

      "Save":
        "Opslaan",

      "Loading...":
        "Laden...",

      "© 2026 GiftedGift Empire. All rights reserved.":
        "© 2026 GiftedGift Empire. Alle rechten voorbehouden."

    }

  };



  /*
  =========================================================
  STATE
  =========================================================
  */


  let currentLanguage =
    getSavedLanguage();


  let translating =
    false;


  const originalText =
    new WeakMap();


  const originalAttributes =
    new WeakMap();



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


      if (
        SUPPORTED_LANGUAGES.includes(
          saved
        )
      ) {

        return saved;

      }

    } catch {}


    return "en";

  }



  function saveLanguage(
    language
  ) {

    try {

      localStorage.setItem(
        STORAGE_KEY,
        language
      );

    } catch {}

  }



  /*
  =========================================================
  TRANSLATE VALUE
  =========================================================
  */


  function translateValue(
    value
  ) {

    if (
      currentLanguage === "en"
    ) {

      return value;

    }


    const dictionary =
      translations[
        currentLanguage
      ];


    if (
      !dictionary
    ) {

      return value;

    }


    if (
      Object.prototype
        .hasOwnProperty
        .call(
          dictionary,
          value
        )
    ) {

      return dictionary[
        value
      ];

    }


    /*
      Dynamic cart counter:
      Cart (2)
      Cart (5)
      etc.
    */


    if (
      currentLanguage === "fr" &&
      /^🛒\s*Cart\s*\(/i.test(
        value
      )
    ) {

      return value.replace(
        /^🛒\s*Cart/i,
        "🛒 Panier"
      );

    }


    if (
      currentLanguage === "de" &&
      /^🛒\s*Cart\s*\(/i.test(
        value
      )
    ) {

      return value.replace(
        /^🛒\s*Cart/i,
        "🛒 Warenkorb"
      );

    }


    if (
      currentLanguage === "nl" &&
      /^🛒\s*Cart\s*\(/i.test(
        value
      )
    ) {

      return value.replace(
        /^🛒\s*Cart/i,
        "🛒 Winkelwagen"
      );

    }


    return value;

  }



  /*
  =========================================================
  TEXT NODES
  =========================================================
  */


  function shouldSkipNode(
    node
  ) {

    const parent =
      node.parentElement;


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



  function translateTextNode(
    node
  ) {

    if (
      shouldSkipNode(
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
        node.nodeValue || ""
      );

    }


    const original =
      originalText.get(
        node
      );


    const trimmed =
      original.trim();


    if (
      !trimmed
    ) {

      return;

    }


    const translated =
      translateValue(
        trimmed
      );


    const leadingSpace =
      original.match(
        /^\s*/
      )?.[0] || "";


    const trailingSpace =
      original.match(
        /\s*$/
      )?.[0] || "";


    node.nodeValue =
      leadingSpace +
      translated +
      trailingSpace;

  }



  /*
  =========================================================
  ATTRIBUTES
  =========================================================
  */


  function rememberAttribute(
    element,
    attribute
  ) {

    let stored =
      originalAttributes.get(
        element
      );


    if (
      !stored
    ) {

      stored =
        new Map();


      originalAttributes.set(
        element,
        stored
      );

    }


    if (
      !stored.has(
        attribute
      )
    ) {

      stored.set(
        attribute,
        element.getAttribute(
          attribute
        )
      );

    }


    return stored.get(
      attribute
    );

  }



  function translateAttributes(
    element
  ) {

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
    ].forEach(
      attribute => {


        if (
          !element.hasAttribute?.(
            attribute
          )
        ) {

          return;

        }


        const original =
          rememberAttribute(
            element,
            attribute
          );


        if (
          original === null
        ) {

          return;

        }


        element.setAttribute(
          attribute,
          translateValue(
            original
          )
        );

      }
    );


    if (
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
        original !== null
      ) {

        element.value =
          translateValue(
            original
          );

      }

    }

  }



  /*
  =========================================================
  TRANSLATE PAGE
  =========================================================
  */


  function translatePage(
    root = document.body
  ) {

    if (
      !root
    ) {

      return;

    }


    translating =
      true;


    try {


      if (
        root.nodeType ===
        Node.TEXT_NODE
      ) {

        translateTextNode(
          root
        );


        return;

      }


      if (
        root.nodeType ===
        Node.ELEMENT_NODE
      ) {

        translateAttributes(
          root
        );

      }


      if (
        root.querySelectorAll
      ) {

        root
          .querySelectorAll(
            "*"
          )
          .forEach(
            translateAttributes
          );

      }


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

        translateTextNode(
          node
        );

      }


      document
        .documentElement
        .setAttribute(
          "lang",
          currentLanguage
        );


      updateLanguageButtons();


    } finally {


      translating =
        false;

    }

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
      !SUPPORTED_LANGUAGES.includes(
        language
      )
    ) {

      return;

    }


    currentLanguage =
      language;


    saveLanguage(
      language
    );


    translatePage();


    window.dispatchEvent(
      new CustomEvent(
        "giftedgift:languagechange",
        {

          detail: {

            language:
              currentLanguage

          }

        }
      )
    );

  }



  /*
  =========================================================
  LANGUAGE SWITCHER
  =========================================================
  */


  function createLanguageSwitcher() {

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

        position: fixed;

        top: 10px;
        right: 10px;

        z-index: 99997;

        display: flex;

        align-items: center;

        gap: 3px;

        padding: 5px;

        background:
          rgba(
            255,
            255,
            255,
            0.97
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
          sans-serif;

      }


      #gge-language-switcher
      .gge-language-icon {

        padding:
          0 3px 0 4px;

        font-size:
          14px;

      }


      #gge-language-switcher
      button {

        min-width:
          37px;

        border:
          0;

        border-radius:
          999px;

        padding:
          7px 8px;

        background:
          transparent;

        color:
          #123a8c;

        cursor:
          pointer;

        font-size:
          12px;

        font-weight:
          900;

      }


      #gge-language-switcher
      button:hover {

        background:
          #eef4ff;

      }


      #gge-language-switcher
      button.active {

        background:
          #123a8c;

        color:
          #ffffff;

      }


      #gge-language-switcher
      button:focus-visible {

        outline:
          2px solid #f2bd16;

        outline-offset:
          2px;

      }


      @media
      (max-width: 600px) {

        #gge-language-switcher {

          top:
            7px;

          right:
            7px;

          transform:
            scale(0.88);

          transform-origin:
            top right;

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
      "role",
      "group"
    );


    wrapper.setAttribute(
      "aria-label",
      "Language"
    );


    wrapper.innerHTML = `

      <span
        class="gge-language-icon"
      >
        🌐
      </span>


      <button
        type="button"
        data-language="en"
        title="English"
      >
        EN
      </button>


      <button
        type="button"
        data-language="fr"
        title="Français"
      >
        FR
      </button>


      <button
        type="button"
        data-language="de"
        title="Deutsch"
      >
        DE
      </button>


      <button
        type="button"
        data-language="nl"
        title="Nederlands"
      >
        NL
      </button>

    `;


    wrapper
      .querySelectorAll(
        "button[data-language]"
      )
      .forEach(
        button => {


          button.addEventListener(
            "click",
            () => {


              setLanguage(
                button.dataset.language
              );

            }
          );

        }
      );


    document.body.appendChild(
      wrapper
    );


    updateLanguageButtons();

  }



  function updateLanguageButtons() {

    document
      .querySelectorAll(
        "#gge-language-switcher button[data-language]"
      )
      .forEach(
        button => {


          const active =
            button.dataset.language ===
            currentLanguage;


          button.classList.toggle(
            "active",
            active
          );


          button.setAttribute(
            "aria-pressed",
            active
              ? "true"
              : "false"
          );

        }
      );

  }



  /*
  =========================================================
  DYNAMIC CONTENT
  =========================================================
  */


  function startObserver() {

    if (
      !document.body
    ) {

      return;

    }


    const observer =
      new MutationObserver(
        mutations => {


          if (
            translating
          ) {

            return;

          }


          mutations.forEach(
            mutation => {


              if (
                mutation.type ===
                "characterData"
              ) {

                originalText.set(
                  mutation.target,
                  mutation.target.nodeValue ||
                  ""
                );


                translatePage(
                  mutation.target
                );


                return;

              }


              mutation
                .addedNodes
                .forEach(
                  node => {


                    translatePage(
                      node
                    );

                  }
                );

            }
          );

        }
      );


    observer.observe(
      document.body,
      {

        childList:
          true,

        subtree:
          true,

        characterData:
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

    createLanguageSwitcher();


    translatePage();


    startObserver();

  }



  window.GiftedGiftLanguage = {

    get:
      function () {

        return currentLanguage;

      },


    set:
      setLanguage,


    refresh:
      function () {

        translatePage();

      }

  };



  if (
    document.readyState ===
    "loading"
  ) {

    document.addEventListener(
      "DOMContentLoaded",
      initialise,
      {
        once: true
      }
    );

  } else {

    initialise();

  }


})();
