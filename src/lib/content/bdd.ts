import type { Subject } from "./types";

export const bdd: Subject = {
  id: "bdd",
  short: "Bases de données",
  title: "Bases de données",
  color: "bdd",
  description:
    "Modèle relationnel, algèbre, SQL, normalisation et transactions — le programme classique d’un écrit de master.",
  examFocus:
    "On te demande d’écrire des requêtes SQL justes (jointures + agrégats + HAVING), de décomposer un schéma jusqu’à 3NF/BCNF, et de lire une expression d’algèbre relationnelle.",
  learn: [
    "Le modèle relationnel (relation, clé, contrainte)",
    "L’algèbre relationnelle",
    "SQL : SELECT, WHERE, JOIN",
    "Agrégats, GROUP BY, HAVING, sous-requêtes",
    "Normalisation 1NF → BCNF",
    "MCD / MLD (Merise)",
    "Transactions ACID et index",
  ],
  tips: [
    "Dessine toujours les tables et les clés avant d’écrire le SQL.",
    "HAVING filtre des groupes ; WHERE filtre des lignes — ne les inverse pas.",
    "Une jointure oubliée produit un produit cartésien (catastrophe silencieuse).",
    "Pour la 3NF : cherche les dépendances transitives X → Y → Z avec X non clé.",
    "COUNT(*) compte les lignes ; COUNT(col) ignore les NULL.",
    "Traduis l’algèbre en SQL : σ → WHERE, π → SELECT, ⋈ → JOIN.",
  ],
  chapters: [
    {
      id: "relationnel",
      title: "Chapitre 1 — Modèle relationnel",
      subtitle: "Relations, clés, intégrité",
      durationMin: 30,
      objectives: [
        "Définir relation, attribut, tuple, domaine",
        "Distinguer clé primaire, candidate, étrangère",
        "Connaître les contraintes d’intégrité",
      ],
      blocks: [
        {
          t: "h2",
          text: "Vocabulaire (à coller au jury)",
          id: "vocab",
        },
        {
          t: "table",
          cols: ["Terme", "Sens", "Équivalent tableur"],
          rows: [
            ["Relation / table", "ensemble de tuples", "feuille"],
            ["Attribut / colonne", "rôle + domaine", "en-tête"],
            ["Tuple / n-uplet", "ligne, sans ordre", "ligne"],
            ["Domaine", "ensemble de valeurs autorisées", "type"],
            ["Schéma", "nom + liste d’attributs", "structure"],
            ["Instance", "contenu à un instant t", "données"],
          ],
        },
        {
          t: "p",
          text: "Une relation est un **ensemble** : pas de doublons théoriques, pas d’ordre des lignes. SQL pratique autorise les doublons (multiset) — d’où `DISTINCT`.",
        },
        {
          t: "h2",
          text: "Clés",
          id: "keys",
        },
        {
          t: "ul",
          items: [
            "**Clé candidate** : ensemble **minimal** d’attributs qui identifie un tuple.",
            "**Clé primaire (PK)** : une clé candidate choisie. Soulignée dans les schémas.",
            "**Clé étrangère (FK)** : attribut(s) qui **référence(nt)** une PK d’une autre (ou la même) relation. Garantit l’intégrité référentielle.",
            "**Clé secondaire / index** : pour accélérer, pas pour identifier.",
            "**Sur-clé (superkey)** : identifie, mais pas forcément minimale.",
          ],
        },
        {
          t: "example",
          title: "Étudiant(numE, nom, email, idVille)",
          blocks: [
            {
              t: "p",
              text: "`numE` clé primaire. `email` probablement unique → clé candidate. `idVille` clé étrangère vers `Ville(idVille, nom)`. On ne met **pas** `nomVille` dans Étudiant (redondance).",
            },
          ],
        },
        {
          t: "h2",
          text: "Contraintes d’intégrité",
          id: "integrity",
        },
        {
          t: "ol",
          items: [
            "**De domaine** : note ∈ [0, 20].",
            "**De clé** : PK unique et non NULL.",
            "**Référentielle** : toute FK existe comme PK (ou est NULL si autorisé).",
            "**De tuple / utilisateur** : `dateRet > dateEmp`.",
            "**NOT NULL, UNIQUE, CHECK, DEFAULT** en SQL.",
          ],
        },
        {
          t: "callout",
          kind: "exam",
          title: "Question type",
          body: "« Peut-on avoir une FK qui référence une clé non primaire ? » En théorie, elle référence une **clé candidate**. En pratique SQL : PRIMARY KEY ou UNIQUE.",
        },
      ],
      quiz: [
        {
          id: "b1q1",
          question: "Une clé primaire peut-elle contenir NULL ?",
          options: ["Oui", "Non", "Seulement si composite", "En MySQL seulement"],
          answer: 1,
          explain: "Unicité + non nullité. NULL casserait l’identification.",
        },
        {
          id: "b1q2",
          question: "Une clé étrangère sert à",
          options: [
            "accélérer les SELECT",
            "garantir l’intégrité référentielle",
            "trier les tuples",
            "remplacer la PK",
          ],
          answer: 1,
          explain: "Elle relie deux relations et empêche les orphelins.",
        },
        {
          id: "b1q3",
          question: "Une relation au sens Codd est",
          options: ["un multiset ordonné", "un ensemble de tuples", "un graphe", "un fichier"],
          answer: 1,
          explain: "Ensemble : pas d’ordre, pas de doublons (théorie).",
        },
        {
          id: "b1q4",
          question: "Une superclé non minimale est",
          options: ["une clé candidate", "une clé primaire", "une sur-clé", "une FK"],
          answer: 2,
          explain: "Superkey ⊇ candidate key.",
        },
      ],
      exercises: [
        {
          id: "b1e1",
          title: "Repérer les clés",
          difficulty: "facile",
          durationMin: 10,
          prompt:
            "Commande(numC, dateC, numClient, numProduit, qte, libelleProduit).\nQuelles redondances ? Quelle(s) clé(s) ? Comment découper ?",
          solution:
            "libelleProduit dépend de numProduit → redondance.\nClé de Commande trop large (numC suffit si une commande = une tête ; sinon (numC, numProduit) pour des lignes).\nDécouper : Produit(numP, libelle), Client(...), Commande(numC, date, numClient), Ligne(numC, numP, qte).",
        },
      ],
    },
    {
      id: "algebre",
      title: "Chapitre 2 — Algèbre relationnelle",
      subtitle: "σ, π, ⋈, ∪, −, ÷",
      durationMin: 35,
      objectives: [
        "Lire et écrire les opérateurs de base",
        "Traduire une phrase française en algèbre",
        "Connaître la division (question de niveau)",
      ],
      blocks: [
        {
          t: "h2",
          text: "Opérateurs unaires",
          id: "unary",
        },
        {
          t: "formula",
          name: "Sélection (filtre de lignes)",
          tex: "\\sigma_{\\text{condition}}(R)",
          note: "Équivalent SQL : WHERE. La condition porte sur les attributs de R.",
        },
        {
          t: "formula",
          name: "Projection (filtre de colonnes)",
          tex: "\\pi_{A,B}(R)",
          note: "Équivalent SQL : SELECT DISTINCT A, B. Les doublons théoriques disparaissent.",
        },
        {
          t: "h2",
          text: "Opérateurs binaires",
          id: "binary",
        },
        {
          t: "table",
          cols: ["Opérateur", "Notation", "Condition", "SQL"],
          rows: [
            ["Union", "R ∪ S", "même schéma", "UNION"],
            ["Différence", "R − S", "même schéma", "EXCEPT / MINUS"],
            ["Intersection", "R ∩ S", "même schéma", "INTERSECT"],
            ["Produit cartésien", "R × S", "—", "FROM R, S"],
            ["Jointure θ", "R ⋈_θ S", "condition", "JOIN ON"],
            ["Jointure naturelle", "R ⋈ S", "attributs homonymes", "NATURAL JOIN"],
            ["Division", "R ÷ S", "voir plus bas", "double NOT EXISTS"],
          ],
        },
        {
          t: "p",
          text: "La **jointure interne** $R \\bowtie_{R.a = S.a} S$ = $\\sigma_{R.a=S.a}(R \\times S)$. C’est la définition à citer.",
        },
        {
          t: "example",
          title: "« Noms des étudiants de Safi ayant une note > 12 en SDA »",
          blocks: [
            {
              t: "math",
              tex: "\\pi_{nom}\\,\\sigma_{ville='Safi'\\,\\wedge\\,note>12\\,\\wedge\\,mod='SDA'}(\\,Etudiant \\bowtie Inscription\\,)",
            },
            {
              t: "p",
              text: "On joint d’abord (pour avoir ville + note + module), on sélectionne, on projette. L’ordre σ puis ⋈ peut se réécrire (optimisation) mais le résultat est le même.",
            },
          ],
        },
        {
          t: "h2",
          text: "Division — « tous les »",
          id: "div",
        },
        {
          t: "p",
          text: "$R(A,B) \\div S(B)$ = les $A$ dont les $B$ associés **contiennent tous** les $B$ de $S$. Phrase déclencheuse : « les étudiants qui se sont inscrits à **tous** les modules ».",
        },
        {
          t: "formula",
          name: "Formule",
          tex: "R \\div S = \\pi_A(R) - \\pi_A\\big(\\pi_A(R)\\times S - R\\big)",
        },
        {
          t: "callout",
          kind: "tip",
          title: "Astuce",
          body: "Si l’énoncé dit « au moins un » → jointure/sélection. S’il dit « tous » / « uniquement » → division (ou NOT EXISTS en SQL). C’est le signal.",
        },
      ],
      quiz: [
        {
          id: "b2q1",
          question: "σ correspond en SQL à",
          options: ["SELECT (colonnes)", "WHERE", "GROUP BY", "ORDER BY"],
          answer: 1,
          explain: "Sélection = filtre de lignes = WHERE.",
        },
        {
          id: "b2q2",
          question: "π_A(R) peut supprimer des lignes car",
          options: [
            "elle trie",
            "la projection théorique élimine les doublons",
            "elle joint",
            "jamais",
          ],
          answer: 1,
          explain: "Deux tuples distincts peuvent devenir identiques une fois restreints à A.",
        },
        {
          id: "b2q3",
          question: "« Les clients qui ont commandé tous les produits » se traduit par",
          options: ["union", "sélection", "division", "différence simple"],
          answer: 2,
          explain: "Quantificateur universel = division.",
        },
        {
          id: "b2q4",
          question: "R ⋈ S (naturelle) vs R × S",
          options: [
            "identique",
            "la naturelle égalise les attributs communs puis les fusionne",
            "× est plus petit",
            "⋈ exige le même schéma",
          ],
          answer: 1,
          explain: "Jointure naturelle = égalité sur les homonymes + une seule copie de ces colonnes.",
        },
      ],
      exercises: [
        {
          id: "b2e1",
          title: "Traduction",
          difficulty: "moyen",
          durationMin: 12,
          prompt:
            "Films(idF, titre, annee), Joue(idA, idF, role), Acteurs(idA, nom).\nExprimer en algèbre : titres des films où joue « Depp » sortis après 2000.",
          solution:
            "π_titre ( σ_annee>2000 ∧ nom='Depp' ( Films ⋈ Joue ⋈ Acteurs ) )",
        },
      ],
    },
    {
      id: "sql-base",
      title: "Chapitre 3 — SQL fondamental",
      subtitle: "SELECT … FROM … WHERE",
      durationMin: 35,
      objectives: [
        "Écrire un SELECT correct",
        "Maîtriser WHERE, LIKE, IN, BETWEEN, NULL",
        "Distinguer DISTINCT, ORDER BY, LIMIT",
      ],
      blocks: [
        {
          t: "code",
          lang: "sql",
          title: "Squelette",
          code: "SELECT [DISTINCT] colonnes | expressions\nFROM   table [alias]\nWHERE  condition\nORDER BY colonne [ASC|DESC]\nLIMIT  n;",
        },
        {
          t: "h2",
          text: "WHERE — opérateurs",
          id: "where",
        },
        {
          t: "ul",
          items: [
            "Comparaisons : `= <> < > <= >=`",
            "`AND` / `OR` / `NOT` — **parenthèse** les OR.",
            "`IN (1,2,3)` ou `IN (sous-requête)`",
            "`BETWEEN a AND b` : intervalle **fermé**.",
            "`LIKE 'A%'` (commence), `'%A'` (finit), `'%A%'` (contient). `_` = 1 caractère.",
            "`IS NULL` / `IS NOT NULL` — **jamais** `= NULL`.",
          ],
        },
        {
          t: "callout",
          kind: "warning",
          title: "NULL n’est pas une valeur",
          body: "`x = NULL` est UNKNOWN, pas TRUE. Une ligne avec note NULL disparaît de `WHERE note >= 10`. Pour les inclure : `note >= 10 OR note IS NULL`.",
        },
        {
          t: "example",
          title: "Étudiants de Safi dont le nom commence par M",
          blocks: [
            {
              t: "code",
              lang: "sql",
              code: "SELECT numE, nom\nFROM Etudiant\nWHERE ville = 'Safi' AND nom LIKE 'M%'\nORDER BY nom;",
            },
          ],
        },
        {
          t: "h2",
          text: "Expressions",
          id: "expr",
        },
        {
          t: "p",
          text: "`SELECT prix * qte AS montant` — `AS` nomme la colonne. `ORDER BY montant` est accepté dans la plupart des SGBD. Alias de table : `FROM Etudiant e` puis `e.nom`.",
        },
        {
          t: "callout",
          kind: "tip",
          title: "Astuce vitesse",
          body: "Écris d’abord FROM + WHERE (le « monde » des lignes), ensuite SELECT (ce que tu montres). C’est l’ordre logique réel du SGBD, et ça évite les jointures oubliées.",
        },
      ],
      quiz: [
        {
          id: "b3q1",
          question: "Pour tester une valeur absente on écrit",
          options: ["col = NULL", "col IS NULL", "col == NULL", "col LIKE NULL"],
          answer: 1,
          explain: "IS NULL est le seul prédicat correct.",
        },
        {
          id: "b3q2",
          question: "LIKE 'a_b' correspond à",
          options: [
            "toute chaîne contenant a et b",
            "une chaîne de 3 caractères : a, un caractère, b",
            "a suivi de b",
            "rien",
          ],
          answer: 1,
          explain: "_ = exactement 1 caractère.",
        },
        {
          id: "b3q3",
          question: "DISTINCT sert à",
          options: [
            "trier",
            "éliminer les doublons du résultat",
            "filtrer les NULL",
            "créer une clé",
          ],
          answer: 1,
          explain: "SELECT DISTINCT col.",
        },
        {
          id: "b3q4",
          question: "BETWEEN 10 AND 20 inclut-il 10 et 20 ?",
          options: ["non", "oui, intervalle fermé", "seulement 10", "seulement 20"],
          answer: 1,
          explain: "col >= 10 AND col <= 20.",
        },
      ],
      exercises: [
        {
          id: "b3e1",
          title: "Filtrer",
          difficulty: "facile",
          durationMin: 8,
          prompt:
            "Table Livre(isbn, titre, annee, prix, genre). Lister titre et prix des romans à moins de 80 DH parus depuis 2015, du plus cher au moins cher.",
          solution:
            "SELECT titre, prix\nFROM Livre\nWHERE genre = 'roman' AND prix < 80 AND annee >= 2015\nORDER BY prix DESC;",
        },
      ],
    },
    {
      id: "jointures",
      title: "Chapitre 4 — Jointures, agrégats, sous-requêtes",
      subtitle: "Le cœur de l’épreuve SQL",
      durationMin: 45,
      objectives: [
        "Écrire INNER / LEFT JOIN",
        "GROUP BY + HAVING sans erreur",
        "Choisir sous-requête vs jointure",
      ],
      blocks: [
        {
          t: "h2",
          text: "Jointures",
          id: "join",
        },
        {
          t: "code",
          lang: "sql",
          title: "INNER JOIN (intersection)",
          code: "SELECT e.nom, i.note\nFROM Etudiant e\nJOIN Inscription i ON i.numE = e.numE\nWHERE i.module = 'SDA';",
        },
        {
          t: "p",
          text: "**LEFT JOIN** : toutes les lignes de gauche, même sans match (colonnes droites à NULL). Utile pour « les étudiants **sans** inscription » :",
        },
        {
          t: "code",
          lang: "sql",
          code: "SELECT e.nom\nFROM Etudiant e\nLEFT JOIN Inscription i ON i.numE = e.numE\nWHERE i.numE IS NULL;",
        },
        {
          t: "callout",
          kind: "warning",
          title: "Produit cartésien",
          body: "`FROM A, B` sans `WHERE A.id = B.id` multiplie les lignes. 100 étudiants × 20 modules = 2000 lignes. Si le résultat « explose », cherche la jointure oubliée.",
        },
        {
          t: "h2",
          text: "Agrégats",
          id: "agg",
        },
        {
          t: "p",
          text: "`COUNT, SUM, AVG, MIN, MAX`. `COUNT(*)` : lignes. `COUNT(col)` : valeurs non NULL. `COUNT(DISTINCT col)` : valeurs distinctes.",
        },
        {
          t: "code",
          lang: "sql",
          title: "GROUP BY + HAVING",
          code: "SELECT module, AVG(note) AS moyenne, COUNT(*) AS n\nFROM Inscription\nGROUP BY module\nHAVING COUNT(*) >= 10 AND AVG(note) >= 12\nORDER BY moyenne DESC;",
        },
        {
          t: "callout",
          kind: "key",
          title: "WHERE vs HAVING",
          body: "**WHERE** : avant le groupement (sur les lignes brutes). **HAVING** : après (sur les agrégats). `WHERE AVG(note) > 12` est **illégal**. `HAVING note > 12` n’a en général pas de sens (note n’est pas un agrégat ni dans le GROUP BY).",
        },
        {
          t: "p",
          text: "Règle d’or : dans le `SELECT` d’une requête groupée, chaque colonne est soit dans le `GROUP BY`, soit dans une fonction d’agrégat.",
        },
        {
          t: "h2",
          text: "Sous-requêtes",
          id: "sub",
        },
        {
          t: "code",
          lang: "sql",
          title: "Étudiants mieux que la moyenne générale",
          code: "SELECT nom, note\nFROM Inscription i JOIN Etudiant e ON e.numE = i.numE\nWHERE note > (SELECT AVG(note) FROM Inscription);",
        },
        {
          t: "code",
          lang: "sql",
          title: "EXISTS — « au moins un »",
          code: "SELECT nom FROM Etudiant e\nWHERE EXISTS (\n  SELECT 1 FROM Inscription i\n  WHERE i.numE = e.numE AND i.note < 8\n);",
        },
        {
          t: "p",
          text: "`NOT EXISTS` exprime souvent la **division** (« tous ») : les étudiants pour lesquels il n’existe pas de module (du sous-ensemble visé) sans inscription.",
        },
        {
          t: "example",
          title: "Modules suivis par tous les étudiants (idée)",
          blocks: [
            {
              t: "code",
              lang: "sql",
              code: "SELECT m.id\nFROM Module m\nWHERE NOT EXISTS (\n  SELECT 1 FROM Etudiant e\n  WHERE NOT EXISTS (\n    SELECT 1 FROM Inscription i\n    WHERE i.numE = e.numE AND i.module = m.id\n  )\n);",
            },
            {
              t: "p",
              text: "« Il n’existe pas d’étudiant qui n’ait pas d’inscription à m ». Double négation = pour tous. Apprends ce **patron** par cœur.",
            },
          ],
        },
      ],
      quiz: [
        {
          id: "b4q1",
          question: "Pour filtrer sur AVG(note) on utilise",
          options: ["WHERE AVG(note) > 10", "HAVING AVG(note) > 10", "ORDER BY AVG", "LIMIT AVG"],
          answer: 1,
          explain: "HAVING agit après GROUP BY.",
        },
        {
          id: "b4q2",
          question: "LEFT JOIN Etudiant → Inscription, WHERE i.numE IS NULL donne",
          options: [
            "tous les étudiants",
            "les étudiants sans inscription",
            "les inscriptions orphelines",
            "un produit cartésien",
          ],
          answer: 1,
          explain: "Anti-jointure classique.",
        },
        {
          id: "b4q3",
          question: "COUNT(note) vs COUNT(*) si des notes sont NULL",
          options: [
            "identique",
            "COUNT(note) ignore les NULL, COUNT(*) non",
            "COUNT(*) ignore les NULL",
            "erreur",
          ],
          answer: 1,
          explain: "Agrégats (sauf COUNT(*)) sautent les NULL.",
        },
        {
          id: "b4q4",
          question: "Le patron double NOT EXISTS exprime",
          options: ["l’union", "la division (« pour tous »)", "la projection", "un tri"],
          answer: 1,
          explain: "Quantificateur universel en SQL.",
        },
      ],
      exercises: [
        {
          id: "b4e1",
          title: "Moyenne par ville",
          difficulty: "moyen",
          durationMin: 12,
          prompt:
            "Etudiant(numE, nom, ville), Inscription(numE, module, note).\nPour chaque ville : nombre d’étudiants inscrits (distincts) et moyenne des notes. Ne garder que les villes de moyenne ≥ 12.",
          solution:
            "SELECT e.ville, COUNT(DISTINCT e.numE) AS nb, AVG(i.note) AS moy\nFROM Etudiant e JOIN Inscription i ON i.numE = e.numE\nGROUP BY e.ville\nHAVING AVG(i.note) >= 12;",
        },
        {
          id: "b4e2",
          title: "Meilleure note",
          difficulty: "moyen",
          durationMin: 10,
          prompt:
            "Noms des étudiants ayant la note maximale (il peut y en avoir plusieurs).",
          hint: "WHERE note = (SELECT MAX(note) FROM Inscription)",
          solution:
            "SELECT e.nom, i.note\nFROM Etudiant e JOIN Inscription i ON i.numE = e.numE\nWHERE i.note = (SELECT MAX(note) FROM Inscription);",
        },
      ],
    },
    {
      id: "normalisation",
      title: "Chapitre 5 — Normalisation",
      subtitle: "DF, 1NF, 2NF, 3NF, BCNF",
      durationMin: 40,
      objectives: [
        "Lire une dépendance fonctionnelle",
        "Décomposer jusqu’à 3NF / BCNF",
        "Justifier la perte ou non de DF",
      ],
      blocks: [
        {
          t: "h2",
          text: "Dépendance fonctionnelle",
          id: "fd",
        },
        {
          t: "formula",
          name: "X → Y",
          tex: "X \\to Y \\;\\;\\text{ssi deux tuples égaux sur } X \\text{ le sont sur } Y",
          note: "« Connaître X suffit à connaître Y ». Exemple : numE → nom.",
        },
        {
          t: "ul",
          items: [
            "**Réflexivité** : $X \\to X$.",
            "**Augmentation** : si $X \\to Y$ alors $XZ \\to YZ$.",
            "**Transitivité** : $X \\to Y$ et $Y \\to Z$ ⇒ $X \\to Z$.",
            "Ces trois-là = **axiomes d’Armstrong**. Ils engendrent toutes les DF.",
            "**Fermeture $X^+$** : tout ce qu’on peut déduire à partir de X.",
            "X est **clé** ssi $X^+ =$ tous les attributs.",
          ],
        },
        {
          t: "h2",
          text: "Formes normales",
          id: "nf",
        },
        {
          t: "table",
          cols: ["FN", "Exigence", "Anomalie visée"],
          rows: [
            ["1NF", "attributs atomiques (pas de liste dans une case)", "répétitions intra-case"],
            ["2NF", "1NF + pas de DF partielle (attr. non clé dépend d’une partie de PK composite)", "redondance"],
            ["3NF", "2NF + pas de DF transitive (non clé → non clé)", "redondance"],
            ["BCNF", "pour toute DF X→Y, X est une superclé", "plus stricte que 3NF"],
          ],
        },
        {
          t: "example",
          title: "Commande(numC, numP, libP, qte, numCli, villeCli)",
          blocks: [
            {
              t: "p",
              text: "PK = (numC, numP). DF : numP → libP (**partielle** : libP ne dépend pas de toute la PK) → pas 2NF. numCli → villeCli et numC → numCli (**transitive**) → pas 3NF.",
            },
            {
              t: "p",
              text: "Décomposition 3NF : `Produit(numP, libP)`, `Client(numCli, villeCli)`, `Commande(numC, numCli)`, `Ligne(numC, numP, qte)`.",
            },
          ],
        },
        {
          t: "callout",
          kind: "exam",
          title: "Méthode en 4 minutes",
          body: "1) Lister les DF évidentes. 2) Trouver une clé (fermeture). 3) Repérer DF partielle → 2NF. 4) Repérer Y→Z avec Y non clé → 3NF. 5) Écrire les relations, PK soulignée, FK indiquées.",
        },
        {
          t: "h3",
          text: "3NF vs BCNF",
        },
        {
          t: "p",
          text: "En 3NF, une DF $X \\to Y$ est autorisée si X est superclé **ou** Y est premier (dans une clé). BCNF n’autorise que « X superclé ». Cas célèbre : `R(Cours, Prof, Salle)` avec Prof→Salle et (Cours,Salle)→Prof — 3NF mais pas BCNF.",
        },
        {
          t: "callout",
          kind: "tip",
          title: "Ne perds pas d’information",
          body: "Une décomposition est **sans perte** si la jointure des fragments reconstitue R. Critère : pour R = R1 ∪ R2, $R1 \\cap R2 \\to R1$ ou $R1 \\cap R2 \\to R2$.",
        },
      ],
      quiz: [
        {
          id: "b5q1",
          question: "1NF interdit",
          options: [
            "les clés étrangères",
            "les attributs non atomiques (listes, ensembles)",
            "les NULL",
            "les jointures",
          ],
          answer: 1,
          explain: "Atomicité des attributs.",
        },
        {
          id: "b5q2",
          question: "Une DF partielle concerne",
          options: [
            "une PK d’un seul attribut",
            "un attribut non premier dépendant d’une partie d’une clé composite",
            "une FK",
            "NULL",
          ],
          answer: 1,
          explain: "C’est la définition de la violation de 2NF.",
        },
        {
          id: "b5q3",
          question: "X est clé si",
          options: ["X → un attribut", "X⁺ = tout le schéma", "X est unique visuellement", "X est une FK"],
          answer: 1,
          explain: "La fermeture couvre tous les attributs.",
        },
        {
          id: "b5q4",
          question: "BCNF est",
          options: [
            "plus faible que 3NF",
            "identique à 3NF",
            "plus stricte : toute DF a une superclé à gauche",
            "un index",
          ],
          answer: 2,
          explain: "BCNF ⊂ 3NF en termes de schémas autorisés.",
        },
      ],
      exercises: [
        {
          id: "b5e1",
          title: "Normaliser",
          difficulty: "difficile",
          durationMin: 18,
          prompt:
            "R(A,B,C,D) avec DF : A→B, B→C, A→D.\nClé ? Forme normale actuelle ? Décomposition 3NF.",
          solution:
            "A⁺ = ABCD → A est clé (seule candidate).\nA→B, A→D ok (clé à gauche). B→C : B n’est pas clé, C n’est pas premier → pas 3NF (transitive A→B→C).\n3NF : R1(A,B,D) PK=A ; R2(B,C) PK=B, FK B→R1.B.",
        },
      ],
    },
    {
      id: "merise",
      title: "Chapitre 6 — Conception MCD / MLD",
      subtitle: "Entités, associations, cardinalités",
      durationMin: 30,
      objectives: [
        "Lire un MCD Merise",
        "Traduire MCD → MLD (tables)",
        "Gérer 1-1, 1-N, N-N et héritage simple",
      ],
      blocks: [
        {
          t: "h2",
          text: "MCD — règles visuelles",
          id: "mcd",
        },
        {
          t: "ul",
          items: [
            "**Entité** : rectangle + identifiant (souligné).",
            "**Association** : losange, éventuellement porteuse de données (date, qté).",
            "**Cardinalités** : (x,y) lues **du côté de l’entité** : min, max de participations.",
            "`(1,1)` — obligatoire et unique. `(0,1)` — optionnel unique. `(1,N)` — au moins une. `(0,N)` — quelconque.",
          ],
        },
        {
          t: "h2",
          text: "MCD → MLD",
          id: "mld",
        },
        {
          t: "table",
          cols: ["Cardinalités", "Traduction"],
          rows: [
            ["1,N — 1,1  (ou 0,1)", "FK du côté **1** (le 1,1) vers le N"],
            ["N-N  (1,N — 1,N)", "table association : PK = (id1, id2) + attributs du losange"],
            ["1,1 — 1,1", "fusion possible, ou FK unique des deux côtés"],
            ["Héritage", "table mère + tables filles (PK=FK), ou table unique + discriminant"],
          ],
        },
        {
          t: "example",
          title: "Commande (0,N) — (1,1) Client",
          blocks: [
            {
              t: "p",
              text: "Un client a 0 à N commandes ; une commande a **exactement un** client. → `Commande(..., idClient)` FK vers `Client`. On ne met **pas** idCommande dans Client.",
            },
          ],
        },
        {
          t: "callout",
          kind: "tip",
          title: "Astuce",
          body: "La FK va **du côté de la cardinalité max = 1**. Phrase : « une commande a un client » → la commande porte l’id du client.",
        },
        {
          t: "h3",
          text: "Association n-aire et CIF",
        },
        {
          t: "p",
          text: "Une contrainte d’intégrité fonctionnelle (CIF) sur une association ternaire réduit souvent le problème à une binaire + DF. Si le jury dessine une CIF, traduis-la en « X détermine Y dans cette association ».",
        },
      ],
      quiz: [
        {
          id: "b6q1",
          question: "Une association N-N se traduit par",
          options: [
            "une FK d’un côté",
            "une table dont la PK est la concaténation des deux identifiants",
            "une fusion des deux entités",
            "rien",
          ],
          answer: 1,
          explain: "Table de liaison.",
        },
        {
          id: "b6q2",
          question: "Cardinalité (0,1) côté Employé vers Service signifie",
          options: [
            "un employé a forcément un service",
            "un employé a au plus un service, éventuellement aucun",
            "un service a 0 ou 1 employé",
            "N-N",
          ],
          answer: 1,
          explain: "On lit les cardinalités du côté de l’entité concernée.",
        },
        {
          id: "b6q3",
          question: "La FK d’une 1-N se place",
          options: [
            "du côté N (chaque N référence le 1)",
            "du côté 1",
            "dans une 3e table toujours",
            "nulle part",
          ],
          answer: 0,
          explain: "L’entité « plusieurs » porte l’identifiant de l’entité « un ».",
        },
        {
          id: "b6q4",
          question: "Un attribut de quantité sur un losange Commande-Produit va",
          options: [
            "dans Client",
            "dans la table association Ligne",
            "dans Produit seulement",
            "nulle part, c’est calculé",
          ],
          answer: 1,
          explain: "Propriété de l’association N-N.",
        },
      ],
      exercises: [
        {
          id: "b6e1",
          title: "Traduction MCD",
          difficulty: "moyen",
          durationMin: 12,
          prompt:
            "Auteur (0,N) Écrit (1,N) Livre, Livre (1,1) Édité (0,N) Editeur. Attribut annee sur Écrit. Donner le MLD (tables, PK, FK).",
          solution:
            "Auteur(idA, ...)\nEditeur(idE, ...)\nLivre(idL, ..., idE)  -- FK idE car Livre (1,1) vers Editeur\nEcrit(idA, idL, annee) -- PK (idA,idL), FK idA, FK idL",
        },
      ],
    },
    {
      id: "transactions",
      title: "Chapitre 7 — Transactions, index, vues",
      subtitle: "ACID, isolation, B-arbre",
      durationMin: 30,
      objectives: [
        "Citer ACID avec un exemple",
        "Comprendre un index",
        "Savoir à quoi sert une vue",
      ],
      blocks: [
        {
          t: "h2",
          text: "ACID",
          id: "acid",
        },
        {
          t: "table",
          cols: ["Lettre", "Nom", "En une phrase"],
          rows: [
            ["A", "Atomicité", "tout ou rien (COMMIT / ROLLBACK)"],
            ["C", "Cohérence", "les contraintes restent vraies après coup"],
            ["I", "Isolation", "les transactions concurrentes ne se voient pas à moitié"],
            ["D", "Durabilité", "après COMMIT, le résultat survit à un crash"],
          ],
        },
        {
          t: "example",
          title: "Virement 500 DH de A vers B",
          blocks: [
            {
              t: "p",
              text: "Deux UPDATE. Si le second échoue, ROLLBACK du premier (atomicité). Si une autre transaction lit entre les deux, elle verrait de l’argent disparaître (isolation, phénomène dirty read).",
            },
          ],
        },
        {
          t: "p",
          text: "Anomalies : **dirty read**, **non-repeatable read**, **phantom**. Niveaux : READ UNCOMMITTED → READ COMMITTED → REPEATABLE READ → SERIALIZABLE (du plus faible au plus fort).",
        },
        {
          t: "h2",
          text: "Index",
          id: "idx",
        },
        {
          t: "p",
          text: "Un index (souvent **B+ tree**) est une structure triée à côté de la table. Il rend `WHERE id = ?` et `ORDER BY` en $O(\\log n)$ I/O au lieu d’un scan $O(n)$. Coût : espace + ralentissement des INSERT/UPDATE.",
        },
        {
          t: "ul",
          items: [
            "PK ⇒ index unique automatique.",
            "Index secondaire sur les FK souvent bénéfique (jointures).",
            "Inutile sur une colonne de 3 valeurs (sexe) : trop peu sélectif.",
            "`EXPLAIN` (hors programme, mais bon à citer) montre si l’index est utilisé.",
          ],
        },
        {
          t: "h2",
          text: "Vues",
          id: "views",
        },
        {
          t: "p",
          text: "`CREATE VIEW v AS SELECT ...` : requête nommée. Sert à simplifier, masquer des colonnes (sécurité), présenter un schéma externe. Une vue n’est en général **pas** matérialisée (recalculée à chaque appel), sauf vue matérialisée.",
        },
      ],
      quiz: [
        {
          id: "b7q1",
          question: "L’atomicité garantit",
          options: [
            "la vitesse",
            "tout ou rien",
            "l’ordre des tuples",
            "l’existence d’un index",
          ],
          answer: 1,
          explain: "COMMIT global ou ROLLBACK global.",
        },
        {
          id: "b7q2",
          question: "Un dirty read c’est",
          options: [
            "lire des données COMMITTED seulement",
            "lire des données d’une transaction pas encore validée",
            "un FULL SCAN",
            "une vue",
          ],
          answer: 1,
          explain: "Lecture sale, interdite dès READ COMMITTED.",
        },
        {
          id: "b7q3",
          question: "Un index B+ tree est surtout utile pour",
          options: [
            "COUNT(*) sans WHERE",
            "recherche par égalité / intervalle sur la colonne indexée",
            "accélérer tous les JOIN automatiquement",
            "remplacer la PK",
          ],
          answer: 1,
          explain: "Point query et range query.",
        },
        {
          id: "b7q4",
          question: "Une vue standard stocke-t-elle les données ?",
          options: ["oui toujours", "non, c’est une requête nommée", "oui si SQL92", "uniquement les PK"],
          answer: 1,
          explain: "Sauf vue matérialisée.",
        },
      ],
      exercises: [
        {
          id: "b7e1",
          title: "Choisir un index",
          difficulty: "facile",
          durationMin: 8,
          prompt:
            "Table Inscription(numE, module, note) de 2 millions de lignes. Requêtes fréquentes : note d’un étudiant donné, moyenne par module. Quels index proposer ? Lesquels éviter ?",
          solution:
            "INDEX (numE) — lookup étudiant. INDEX (module) — GROUP BY module.\nÉviter INDEX(note) si peu de requêtes par note exacte et faible sélectivité.\nPK (numE, module) déjà un index composite utile.",
        },
      ],
    },
    {
      id: "fiche",
      title: "Chapitre 8 — Fiche SQL express",
      subtitle: "Patrons à recoller le jour J",
      durationMin: 20,
      objectives: ["Avoir 8 patrons SQL prêts", "Éviter les 10 erreurs fatales"],
      blocks: [
        {
          t: "h2",
          text: "Patrons",
          id: "pat",
        },
        {
          t: "code",
          lang: "sql",
          title: "1. Jointure filtrée",
          code: "SELECT a.col, b.col\nFROM A a JOIN B b ON b.fk = a.pk\nWHERE ...;",
        },
        {
          t: "code",
          lang: "sql",
          title: "2. Anti-jointure (sans)",
          code: "SELECT a.*\nFROM A a LEFT JOIN B b ON b.fk = a.pk\nWHERE b.fk IS NULL;",
        },
        {
          t: "code",
          lang: "sql",
          title: "3. Agrégat groupé",
          code: "SELECT cle, COUNT(*) n, AVG(x) m\nFROM T\nWHERE /* lignes */\nGROUP BY cle\nHAVING COUNT(*) >= 2;",
        },
        {
          t: "code",
          lang: "sql",
          title: "4. Comparer à un agrégat global",
          code: "WHERE note > (SELECT AVG(note) FROM Inscription)",
        },
        {
          t: "code",
          lang: "sql",
          title: "5. Top-1 par groupe (idée)",
          code: "WHERE note = (\n  SELECT MAX(i2.note) FROM Inscription i2\n  WHERE i2.module = i.module\n)",
        },
        {
          t: "h2",
          text: "10 erreurs fatales",
          id: "err",
        },
        {
          t: "ol",
          items: [
            "Oublier la condition de jointure",
            "`= NULL` au lieu de `IS NULL`",
            "`WHERE AVG(...)` au lieu de `HAVING`",
            "Colonne ni agrégée ni dans GROUP BY",
            "Confondre COUNT(*) et COUNT(col)",
            "LIKE sans % ",
            "Comparer des dates comme des chaînes mal formatées",
            "SELECT * dans une copie d’examen (perd des points de clarté)",
            "Division (« tous ») traduite par une simple jointure",
            "Normalisation : laisser une DF transitive « parce que ça marche »",
          ],
        },
        {
          t: "callout",
          kind: "exam",
          title: "Temps",
          body: "Sur une question SQL : 2 min de schéma + clés sur le brouillon, 5 min d’écriture, 1 min de relecture (FROM, ON, WHERE vs HAVING). Si tu bloques sur « tous les », écris le double NOT EXISTS même imparfait — le patron est noté.",
        },
      ],
      quiz: [
        {
          id: "b8q1",
          question: "Première chose à dessiner avant le SQL",
          options: [
            "un index",
            "les tables avec PK / FK",
            "un MCD complet au propre",
            "rien",
          ],
          answer: 1,
          explain: "Sans clés, les jointures sont des paris.",
        },
        {
          id: "b8q2",
          question: "« Les clients sans commande » : patron",
          options: ["INNER JOIN", "LEFT JOIN + IS NULL", "GROUP BY seul", "UNION"],
          answer: 1,
          explain: "Anti-jointure.",
        },
        {
          id: "b8q3",
          question: "SELECT ville, COUNT(*) FROM Etu;  (sans GROUP BY) est",
          options: ["correct", "illégal (ville n’est pas agrégée)", "un LEFT JOIN", "une vue"],
          answer: 1,
          explain: "En mode strict, toute colonne du SELECT doit être agrégée ou dans GROUP BY.",
        },
        {
          id: "b8q4",
          question: "Signal du mot « tous » dans un énoncé",
          options: ["WHERE", "division / NOT EXISTS", "INDEX", "1NF"],
          answer: 1,
          explain: "Quantificateur universel.",
        },
      ],
      exercises: [
        {
          id: "b8e1",
          title: "Mini-sujet SQL",
          difficulty: "difficile",
          durationMin: 20,
          prompt:
            "Client(idC, nom, ville), Commande(idCo, date, idC), Ligne(idCo, idP, qte), Produit(idP, lib, prix).\n1) Total dépensé par client (nom, somme). 2) Clients n’ayant jamais commandé. 3) Produits commandés par tous les clients de Safi.",
          solution:
            "1) SELECT c.nom, SUM(l.qte * p.prix)\nFROM Client c JOIN Commande co ON co.idC=c.idC\nJOIN Ligne l ON l.idCo=co.idCo JOIN Produit p ON p.idP=l.idP\nGROUP BY c.idC, c.nom;\n\n2) SELECT c.* FROM Client c LEFT JOIN Commande co ON co.idC=c.idC WHERE co.idCo IS NULL;\n\n3) Produits p tels que NOT EXISTS un client de Safi sans ligne vers p\n(double NOT EXISTS, filtrés sur ville='Safi').",
        },
      ],
    },
  ],
};
