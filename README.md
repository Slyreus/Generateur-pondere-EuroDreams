# Eurodreams

Interface locale de tirage EuroDreams pondéré à partir des statistiques fournies.

## Contenu

- `index.html` : structure de l'interface.
- `styles.css` : mise en page et rendu visuel.
- `app.js` : données, tirage pondéré, recalcul des probabilités et affichage.

## Fonctionnement

Le tirage sélectionne 6 numéros parmi 1 à 40, sans doublon, puis 1 numéro Dream parmi 1 à 5. À chaque tirage, les numéros déjà sortis sont retirés et la probabilité de la prochaine boule est recalculée sur le poids restant.

Les poids utilisés sont les `% de sorties` fournis, avec une dernière mise à jour au 27/04/26.

L'interface anime chaque étape : rotation visuelle avant sélection, mise à jour fluide des pondérations, surbrillance de la boule tirée, journal dynamique et célébration à la fin du tirage.

Dans les cartes, `Historique` correspond au `% de sorties` du tableau source. `Prochaine` correspond à la probabilité instantanée du tirage pondéré, calculée avec le poids du numéro divisé par la somme des poids encore disponibles. La barre bleue affiche seulement le poids historique relatif au poids le plus élevé.

## Lancer

Ouvrir `index.html` dans un navigateur.
