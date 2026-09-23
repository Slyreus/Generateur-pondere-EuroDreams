# EuroDreams

Interface locale de tirage EuroDreams pondéré à partir des statistiques fournies.

## Contenu

- `index.html` : structure de l'interface.
- `styles.css` : mise en page et rendu visuel.
- `app.js` : données, tirage pondéré, recalcul des probabilités et affichage.

## Fonctionnement

Le tirage sélectionne 6 numéros parmi 1 à 40, sans doublon, puis 1 numéro Dream parmi 1 à 5. À chaque tirage, les numéros déjà sortis sont retirés et la probabilité de la prochaine boule est recalculée sur le poids restant.

Les poids utilisés sont les `% de sorties` fournis, avec une dernière mise à jour au 27/04/26.

**Tout tirer** génère le ticket complet immédiatement. Après une ou plusieurs boules, **Compléter** tire uniquement les numéros restants et le Dream. **1 boule** conserve le tirage animé étape par étape. La réinitialisation annule aussi une animation en cours.

Chaque carte affiche le nombre de sorties et les pourcentages **historique → prochaine boule**. En vert, le second pourcentage est celui au moment du tirage ; la pastille indique l'ordre. La barre bleue représente le poids historique relatif au maximum.

Les neuf indicateurs restent accessibles dans **Statistiques**. Le classement, le journal et l'aide **Lire les chiffres** complètent la grille compacte, adaptée aux écrans mobiles.

Raccourcis : **Espace** ou **Entrée** pour une boule, **R** pour réinitialiser. Lorsqu'un bouton ou une aide a le focus, Entrée et Espace conservent leur action habituelle. Les animations suivent la préférence de réduction des mouvements du navigateur.

## Lancer

Ouvrir `index.html` dans un navigateur.
