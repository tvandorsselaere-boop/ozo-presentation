// Catalogue technique OZO — version assainie pour la démo (specs produits + prix publics).
// AUCUN nom de client / référence industrielle confidentielle ici.
// Source : ozo-electric.com (catalogue public).

const CATALOG = `
ENTREPRISE
- OZO Electric — fabricant français (Éguilles, 13), fondé en 2010.
- Conception & assemblage France. Cellules de marques reconnues (Panasonic, LG, Samsung, EVE, CATL).
- Garantie 2 ans. Retour sous 10 jours. SAV / reconditionnement (reprise batteries usagées).
- Email technique : technique@ozo-electric.com — Tél : +33 (0)4 42 52 17 87.

TECHNOLOGIES LITHIUM
- Li-Ion (LiMn/LiPo) : mobilité, vélo, compacité. 12V-72V, 500-1000 cycles, haute densité.
- LiFePO4 (LFP) : solaire, nautisme, stationnaire, DIY. 12V-60V, 3000-8000 cycles, densité moyenne.
- LiPo : haute puissance. 12V-48V, 300-500 cycles.
- Formats batterie vélo : PVC/Softpack, carénée (Hailong/Dolphin/cadre), valise étanche IP67, porte-bagages, silverfish, cadre.

BATTERIES VÉLO 36V
- PVC 36V : 249 € — 250Wh à 1800Wh — sans carénage, reconditionnement possible.
- Carénée 36V : 259-299 € — 250/350/500/700Wh — format gourde/Hailong, verrouillable.
- Silverfish 36V : 349 € — 250/350/500Wh — compatible VAE de marques.
- Porte-bagages 36V : 399 € — 250/280/360/500Wh — carter alu, feu arrière.
- Cadre 36V : 499 € — 500/1000Wh — fixation porte-bidon.

BATTERIES VÉLO 48V
- PVC 48V : 299 € — 250Wh à 1800Wh — sans carénage.
- Carénée 48V : 299 € — 250/350/500/700Wh — gourde/Hailong, verrouillable.
- Silverfish 48V : 399 € — 250/350/500Wh — compatible VAE de marques.
- Porte-bagages 48V : 449 € — 250/280/360/500Wh — carter alu.
- Valise IP67 48V : 439 € — 260/340Wh — étanche IP67 marine.
- Cadre 48V : 549 € — 500/1000Wh.

BATTERIES VÉLO AUTRES TENSIONS
- PVC 12V : 99 € — 150/300Wh — éclairage/low power.
- PVC 24V : 149 € — 250/500Wh — kayak, trottinette.
- PVC 60V : 499 € — 500 à 1800Wh — moto, quad.
- PVC 72V : 599 € — 500 à 1800Wh — moto, performance.

KITS VÉLO COMPLETS (moteur + batterie) — couple et usage
- Touring 250W roue AR + 36V : 866,10 € — 40 N.m — ville léger, rider < 80 kg.
- Trail 250W roue AR + 36V : 966,10 € — 50 N.m — mixte, rider > 90 kg.
- Bafang BBS01 250W pédalier + 36V : 956,10 € — 80 N.m — côte, confort.
- Hornet axe traversant 250W + 36V : 996,10 € — 38 N.m — route/gravel/VTT.
- Enduro 500W + 36V : 1 137,10 € — 70 N.m.
- Bafang BBS02 500W pédalier + 36V : 1 156,10 € — 120 N.m — VTT/cargo, rider > 85 kg.
- Freeride 750W + 48V : 1 292 €.
- Bafang BBS02 750W + 48V : 1 362 € — 160 N.m, rider > 100 kg.
- Bafang BBSHD 1000W + 48V : 1 573 € — > 200 N.m, rider > 110 kg, le plus puissant.
- Fat 250W + 36V : 1 057,20 € — 55 N.m / Fat 500W + 36V : 1 247,20 € — 80 N.m / Fat 750W + 48V : 1 407,10 € — 85 N.m.
- Cargo/Tandem roue avant 500W + 36V : 1 212,50 € — 70 N.m.

KITS VÉLO SANS BATTERIE (moteur seul monté en roue/pédalier)
- Touring 250W roue AR ou AV : 520 € — 40 N.m — ville, IP66.
- Bafang BBS01 250W pédalier : 649 € — 80 N.m — tout usage.
- Bafang BBS02 500W pédalier 36V : 699 € — 120 N.m — VTT/cargo.
- Fat 250/500/750W roue AR : 697,20 € — 60 N.m.
- Tandem 250W roue AV renforcé : 676,50 € — 55 N.m.
- Kid 250W 24" ou 20" roue AR : 582-592 € — vélos enfants.

MOTEURS VÉLO SEULS
- 250W entraxe 155mm : 179 € — réparation universelle.
- Roue Brompton 16" 250W : 299 € — vélo pliant Brompton.
- Hornet 250W axe traversant 12x142mm : 299 € — 38 N.m, 1,7 kg.
- Bobber AR 250W cassette : 304,10 € — 40 N.m — compatible cassette SRAM/Shimano.
- RUNNER AV 250W : 304,10 € — 40 N.m — homologué EN15194.
- Freerider 500/750W 36/48V : 404,10 € — VTT.
- Speedster RH212 1000W : 428,20 € — direct drive, haute performance.

CONTRÔLEURS VÉLO (compatibilité moteur/batterie)
- Externe 15A 36V OZO : 90 € — FOC, IP65, connecteur 9 pins Julet.
- Externe 22A 36/48V OZO : 105 € — FOC, IP65, 9 pins Julet.
- Intégré GRD/CADRE 36V 15A : 115 €.
- 25A dual sensored FOC 12-48V : 119 €.
- OZO 35A dual FOC 24-48V : 159 €.
- 40A 48-72V OZO : 179 € — regen passive, programmable.
- Universel générique VAE 24-48V : 70 € — réparation universelle.

DISPLAYS / AFFICHEURS
- LED 250W 36V : 25 € / LCD 250W 36V : 35 € / LCD 500W 36-48V : 45 € / LCD 750W 48V : 55 €.

CAPTEURS & ACCÉLÉRATEURS VÉLO
- Capteur pédalier standard : 15 € / Capteur pédalier à couple (torque) : 45 €.
- Accélérateur demi-poignée : 29 € / au pouce : 20 € / gâchette : 25 €.

NAUTISME (kayak)
- Moteur 600W kayak seul : 249 € — 24V, brushless, aileron.
- Kit kayak sans batterie : 459 € — 600W 24V, montage 1 min.
- Kit kayak avec batterie 36V : 719 € — jusqu'à 8 km/h.

RÈGLES TECHNIQUES UTILES
- Moteur roue = simple, économique, bon pour le plat/ville. Moteur pédalier (Bafang BBS) = meilleur en côte et avec charge (couple plus élevé via la transmission), idéal cargo/VTT/charge lourde.
- Plus le rider/charge est lourd ou le terrain pentu, plus il faut du couple (N.m) : 40-50 N.m ville, 70-120 N.m VTT/charge, 160-200+ N.m cargo lourd/gros gabarit.
- Tension batterie (36V/48V) doit correspondre au moteur ET au contrôleur. Un contrôleur 36/48V (ex. 22A) accepte les deux tensions.
- Légalité VAE France : assistance 250W bridée à 25 km/h (EN15194). Au-delà (500W+, débridé) = usage privé/terrain, pas homologué route.
- Autonomie ≈ capacité (Wh) ÷ consommation (~10-20 Wh/km selon assistance, poids, relief).
`;

module.exports = { CATALOG };
