import type { Subject } from "./types";

export const algoC: Subject = {
  id: "algo-c",
  short: "Algo / C",
  title: "Algorithmique / Programmation (langage C)",
  color: "algo",
  description:
    "Maîtriser les concepts fondamentaux de la programmation en langage C et les structures de données essentielles, au niveau d’un concours de master.",
  examFocus:
    "Le jury teste la lecture de code, les pointeurs, les tableaux, la récursivité et la complexité. On écrit peu de prose : on trace, on corrige, on implémente.",
  learn: [
    "Les bases du langage C (types, I/O, opérateurs)",
    "Les structures de contrôle",
    "Les tableaux et chaînes de caractères",
    "Les fonctions et la récursivité",
    "Les pointeurs et la gestion de la mémoire",
    "Les structures, fichiers et listes",
    "Tris, recherches et complexité",
  ],
  tips: [
    "Commence par comprendre la logique avant de mémoriser.",
    "Trace à la main : tableau d’état (variables × itérations).",
    "Entraîne-toi à coder sans compilateur — le concours est sur papier.",
    "Apprends les erreurs courantes du compilateur (très utiles au QCM).",
    "Pour un algorithme : invariant + complexité, pas seulement le code.",
    "scanf : n’oublie jamais le & sauf pour une chaîne.",
  ],
  chapters: [
    {
      id: "bases",
      title: "Chapitre 1 — Bases du langage C",
      subtitle: "Types, opérateurs, I/O, compilation",
      durationMin: 35,
      objectives: [
        "Connaître le pipeline de compilation",
        "Maîtriser types, formats printf/scanf et priorités",
        "Éviter les pièges d’overflow et de conversion",
      ],
      blocks: [
        {
          t: "callout",
          kind: "exam",
          title: "Ce que le concours demande",
          body: "On ne te demande pas d’être un ingénieur système. On te demande de **lire** un programme de 15 lignes, de dire ce qu’il affiche, et d’écrire une fonction correcte (swap, max, palindrome, factorielle).",
        },
        {
          t: "h2",
          text: "De la source à l’exécutable",
          id: "compile",
        },
        {
          t: "p",
          text: "Un fichier `.c` traverse **quatre étapes** : préprocesseur (`#include`, `#define`) → compilation vers assembleur → assemblage vers fichier objet `.o` → **édition de liens** (libc : `printf`, `malloc`…).",
        },
        {
          t: "code",
          lang: "bash",
          title: "Commandes à connaître",
          code: "gcc -Wall -Wextra -std=c11 prog.c -o prog\n./prog",
        },
        {
          t: "h2",
          text: "Types fondamentaux",
          id: "types",
        },
        {
          t: "table",
          caption: "Tailles typiques (architecture 64 bits)",
          cols: ["Type", "Taille", "Ordre de grandeur", "Format"],
          rows: [
            ["char", "1 octet", "−128…127 (signé)", "%c / %d"],
            ["int", "4 octets", "≈ ±2×10⁹", "%d"],
            ["long", "8 octets (LP64)", "≈ ±9×10¹⁸", "%ld"],
            ["float", "4 octets", "~7 chiffres", "%f"],
            ["double", "8 octets", "~16 chiffres", "%lf (scanf)"],
            ["unsigned int", "4 octets", "0…≈4×10⁹", "%u"],
          ],
        },
        {
          t: "callout",
          kind: "warning",
          title: "Piège classique",
          body: "`sizeof` renvoie un `size_t` (non signé). L’expression `sizeof(int)` vaut **4**, pas 4×8 bits à afficher. Pour afficher : `printf(\"%zu\", sizeof(x));`. Comparer `sizeof` à un `int` négatif est un piège de QCM.",
        },
        {
          t: "h2",
          text: "Entrées / sorties",
          id: "io",
        },
        {
          t: "code",
          lang: "c",
          title: "Squelette minimal — à connaître par cœur",
          code: "#include <stdio.h>\n\nint main(void) {\n    int n;\n    printf(\"n = \");\n    if (scanf(\"%d\", &n) != 1) return 1;\n    printf(\"n au carré = %d\\n\", n * n);\n    return 0;\n}",
        },
        {
          t: "ul",
          items: [
            "`scanf(\"%d\", &n)` : le **&** est obligatoire (on passe l’adresse).",
            "`scanf(\"%s\", buf)` : **pas de &** — un tableau décroît en pointeur.",
            "`scanf` retourne le nombre de champs lus. Tester `!= 1` est propre.",
            "`\\n` dans le format de `printf` : sans lui, le buffer peut ne pas s’afficher.",
          ],
        },
        {
          t: "h2",
          text: "Opérateurs et priorités",
          id: "ops",
        },
        {
          t: "p",
          text: "À retenir dans l’ordre (du plus fort au plus faible) : `() [] -> .`  →  `! ~ ++ -- * &` (unaires)  →  `* / %`  →  `+ -`  →  `<< >>`  →  `< >`  →  `== !=`  →  `& ^ |`  →  `&& ||`  →  `?:`  →  `=` .",
        },
        {
          t: "example",
          title: "Que vaut i après ces lignes ?",
          blocks: [
            {
              t: "code",
              lang: "c",
              code: "int i = 5;\nint a = i++;   /* a = 5, puis i = 6 */\nint b = ++i;   /* i = 7, puis b = 7 */",
            },
            {
              t: "p",
              text: "**Post-incrément `i++`** : on utilise la valeur **puis** on incrémente. **Pré-incrément `++i`** : on incrémente **puis** on utilise. Au concours, trace **toujours** une colonne `i`.",
            },
          ],
        },
        {
          t: "callout",
          kind: "tip",
          title: "Astuce vitesse",
          body: "Division entière : `7/2 = 3` (pas 3.5). Reste : `7%2 = 1`. Un entier est pair ssi `n % 2 == 0`. Pour les puissances de 2 : `n & (n-1)` vaut 0 (bit trick, parfois en QCM).",
        },
        {
          t: "formula",
          name: "Conversion / overflow",
          tex: "\\text{si } n > 2^{31}-1 \\text{ alors un } \\mathtt{int} \\text{ déborde (UB en C signé)}",
          note: "En QCM, on te demande souvent le résultat de 2000000000 + 2000000000.",
        },
      ],
      quiz: [
        {
          id: "a1q1",
          question: "Que faut-il écrire pour lire un entier n au clavier ?",
          options: [
            "scanf(\"%d\", n);",
            "scanf(\"%d\", &n);",
            "printf(\"%d\", &n);",
            "scanf(\"%d\", *n);",
          ],
          answer: 1,
          explain: "scanf a besoin de l’adresse de n pour y écrire. D’où le &.",
        },
        {
          id: "a1q2",
          question: "Que vaut 7 / 2 en C si 7 et 2 sont des int ?",
          options: ["3.5", "4", "3", "2"],
          answer: 2,
          explain: "Division entière : la partie fractionnaire est tronquée vers 0.",
        },
        {
          id: "a1q3",
          question: "int i = 3; int x = i++;  Quelle est la valeur de x ?",
          options: ["3", "4", "2", "indéfinie"],
          answer: 0,
          explain: "Post-incrément : x reçoit 3, ensuite i devient 4.",
        },
        {
          id: "a1q4",
          question: "Pourquoi scanf(\"%s\", buf) n’a-t-il pas de & ?",
          options: [
            "Parce que %s est spécial",
            "Parce qu’un tableau se convertit en pointeur (adresse du 1er élément)",
            "Parce que scanf ne lit pas les chaînes",
            "Il faut quand même écrire &buf",
          ],
          answer: 1,
          explain: "buf ≡ &buf[0]. Passer &buf serait un pointeur sur tableau (type différent).",
        },
      ],
      exercises: [
        {
          id: "a1e1",
          title: "Signe d’un entier",
          difficulty: "facile",
          durationMin: 8,
          prompt:
            "Écrire un programme qui lit un entier et affiche POSITIF, NEGATIF ou NUL. Utiliser if / else if / else.",
          hint: "Zéro n’est ni positif ni négatif — traiter ce cas en premier ou avec else if.",
          solution:
            "#include <stdio.h>\nint main(void) {\n  int n; scanf(\"%d\", &n);\n  if (n > 0) printf(\"POSITIF\\n\");\n  else if (n < 0) printf(\"NEGATIF\\n\");\n  else printf(\"NUL\\n\");\n  return 0;\n}",
        },
      ],
    },
    {
      id: "controle",
      title: "Chapitre 2 — Structures de contrôle",
      subtitle: "if, switch, boucles, traces",
      durationMin: 40,
      objectives: [
        "Maîtriser if / else if / switch",
        "Choisir for, while ou do-while",
        "Tracer une boucle à la main",
      ],
      blocks: [
        {
          t: "h2",
          text: "Les instructions conditionnelles",
          id: "if",
        },
        {
          t: "p",
          text: "En C, une condition est vraie si elle est **non nulle**. `if (n)` est équivalent à `if (n != 0)`. C’est un piège fréquent dans les QCM.",
        },
        {
          t: "code",
          lang: "c",
          title: "Forme canonique",
          code: "if (condition) {\n    /* bloc si vraie */\n} else if (autre) {\n    /* autre bloc */\n} else {\n    /* aucune condition vraie */\n}",
        },
        {
          t: "callout",
          kind: "warning",
          title: "Le = qui tue",
          body: "`if (x = 0)` **assigne** 0 à x, puis teste 0 → le bloc n’est jamais exécuté. On voulait `if (x == 0)`. Astuce : écrire `if (0 == x)` (yoda) rend l’erreur de frappe `if (0 = x)` illégale.",
        },
        {
          t: "h3",
          text: "switch",
        },
        {
          t: "p",
          text: "`switch (e)` compare un **entier** (ou char) à des `case` constants. Sans `break`, on « tombe » dans le case suivant (**fall-through**). `default` est optionnel mais recommandé.",
        },
        {
          t: "h2",
          text: "Boucles",
          id: "loops",
        },
        {
          t: "table",
          cols: ["Boucle", "Quand l’utiliser", "Test"],
          rows: [
            ["for (i=0; i<n; i++)", "On connaît le nombre d’itérations", "avant le corps"],
            ["while (cond)", "On s’arrête sur une condition", "avant le corps (0 fois possible)"],
            ["do { } while (cond)", "Au moins une exécution (menu, saisie)", "après le corps"],
          ],
        },
        {
          t: "example",
          title: "Trace : que s’affiche-t-il ?",
          blocks: [
            {
              t: "code",
              lang: "c",
              code: "int s = 0;\nfor (int i = 1; i <= 5; i++) {\n    if (i % 2 == 0) continue;\n    s += i;\n}\nprintf(\"%d\", s);",
            },
            {
              t: "p",
              text: "`continue` saute le reste de l’itération. Les i pairs sont ignorés. On additionne 1+3+5 = **9**.",
            },
          ],
        },
        {
          t: "callout",
          kind: "tip",
          title: "Astuce papier",
          body: "Dresse un tableau : colonnes `i`, `s`, `condition`. Une ligne par itération. Tu évites 80 % des erreurs de QCM « que affiche ce programme ».",
        },
        {
          t: "h2",
          text: "break vs return vs continue",
          id: "jump",
        },
        {
          t: "ul",
          items: [
            "`break` : sort de la boucle (ou du switch) **la plus interne**.",
            "`continue` : passe à l’itération suivante.",
            "`return` : quitte la **fonction** (donc aussi la boucle).",
            "`goto` : existe, à éviter sauf pour sortir de boucles imbriquées — rarement exigé.",
          ],
        },
        {
          t: "example",
          title: "Premier diviseur — while",
          blocks: [
            {
              t: "code",
              lang: "c",
              code: "int n = 91, d = 2;\nwhile (d * d <= n && n % d != 0) d++;\nif (n % d == 0 && n != d) printf(\"%d divise %d\", d, n);\nelse printf(\"%d premier\", n);",
            },
            {
              t: "p",
              text: "Test de primalité jusqu’à $\\sqrt{n}$. 91 = 7×13, donc on affiche que 7 divise 91. Complexité $O(\\sqrt{n})$.",
            },
          ],
        },
      ],
      quiz: [
        {
          id: "a2q1",
          question: "Combien de fois le corps de for (int i = 0; i < 5; i++) s’exécute-t-il ?",
          options: ["4", "5", "6", "0"],
          answer: 1,
          explain: "i = 0,1,2,3,4 → 5 itérations. Le test i < 5 échoue quand i vaut 5.",
        },
        {
          id: "a2q2",
          question: "Quelle est la différence principale entre while et do-while ?",
          options: [
            "do-while est plus rapide",
            "do-while exécute le corps au moins une fois",
            "while ne peut pas utiliser break",
            "aucune",
          ],
          answer: 1,
          explain: "Le test du do-while est en fin de boucle.",
        },
        {
          id: "a2q3",
          question: "if (x = 1) { ... } — que se passe-t-il ?",
          options: [
            "Erreur de compilation obligatoire",
            "Le bloc s’exécute toujours (x devient 1, valeur vraie)",
            "Le bloc ne s’exécute jamais",
            "x est comparé à 1",
          ],
          answer: 1,
          explain: "C’est une affectation. x vaut 1, donc la condition est vraie.",
        },
        {
          id: "a2q4",
          question: "Dans un switch, que se passe-t-il si on oublie break ?",
          options: [
            "Erreur de compilation",
            "Rien, break est optionnel sans effet",
            "Fall-through : les case suivants s’exécutent aussi",
            "Le programme plante",
          ],
          answer: 2,
          explain: "Sans break, l’exécution continue dans les case suivants.",
        },
      ],
      exercises: [
        {
          id: "a2e1",
          title: "Table de multiplication",
          difficulty: "facile",
          durationMin: 10,
          prompt:
            "Lire n et afficher la table de n (n×1 jusqu’à n×10), une ligne par produit.",
          solution:
            "int n; scanf(\"%d\", &n);\nfor (int i = 1; i <= 10; i++)\n    printf(\"%d x %d = %d\\n\", n, i, n * i);",
        },
        {
          id: "a2e2",
          title: "PGCD d’Euclide",
          difficulty: "moyen",
          durationMin: 12,
          prompt:
            "Implémenter le PGCD par l’algorithme d’Euclide : tant que b ≠ 0, (a, b) ← (b, a mod b). Retourner a.",
          hint: "while (b != 0) { int r = a % b; a = b; b = r; }",
          solution:
            "int pgcd(int a, int b) {\n    while (b != 0) {\n        int r = a % b;\n        a = b;\n        b = r;\n    }\n    return a;\n}",
        },
      ],
    },
    {
      id: "tableaux",
      title: "Chapitre 3 — Tableaux et chaînes",
      subtitle: "Indexation, parcours, string.h",
      durationMin: 40,
      objectives: [
        "Parcourir un tableau sans débordement",
        "Maîtriser les chaînes C (terminateur '\\0')",
        "Utiliser strlen / strcpy / strcmp",
      ],
      blocks: [
        {
          t: "h2",
          text: "Tableaux",
          id: "arrays",
        },
        {
          t: "p",
          text: "Un tableau `int t[n]` réserve **n** cases **contiguës**. Les indices vont de **0 à n−1**. `t[n]` est un débordement (undefined behavior) — QCM fréquent.",
        },
        {
          t: "code",
          lang: "c",
          title: "Lecture et somme",
          code: "int n, t[100], s = 0;\nscanf(\"%d\", &n);\nfor (int i = 0; i < n; i++) {\n    scanf(\"%d\", &t[i]);\n    s += t[i];\n}\nprintf(\"somme = %d, moyenne = %.2f\\n\", s, (double)s / n);",
        },
        {
          t: "callout",
          kind: "key",
          title: "Cast pour la moyenne",
          body: "`s / n` est une division **entière**. Il faut `(double)s / n` (ou `s / (double)n`). Oublier le cast est une erreur de concours très classique.",
        },
        {
          t: "formula",
          name: "Nombre d’éléments d’un tableau statique",
          tex: "N = \\frac{\\mathtt{sizeof}(t)}{\\mathtt{sizeof}(t[0])}",
          note: "Ne marche PAS si t a été passé à une fonction (il décroît en pointeur, sizeof(t) = 8).",
        },
        {
          t: "h2",
          text: "Tableaux à deux dimensions",
          id: "mat",
        },
        {
          t: "p",
          text: "`int a[L][C];` — `a[i][j]` est la ligne i, colonne j. Stockage **row-major** : les colonnes d’une même ligne sont contiguës. Pour parcourir : boucle i (lignes) puis j (colonnes).",
        },
        {
          t: "code",
          lang: "c",
          title: "Trace d’une matrice 2×3",
          code: "int a[2][3] = {{1,2,3},{4,5,6}};\n/* a[1][0] == 4  |  a[0][2] == 3 */",
        },
        {
          t: "h2",
          text: "Chaînes de caractères",
          id: "str",
        },
        {
          t: "p",
          text: "En C, une chaîne est un tableau de `char` **terminé par `'\\0'`** (octet 0). `\"abc\"` occupe **4** octets : `'a','b','c','\\0'`. `strlen` compte **sans** le `'\\0'`.",
        },
        {
          t: "table",
          cols: ["Fonction", "Rôle", "Attention"],
          rows: [
            ["strlen(s)", "longueur", "ne compte pas '\\0'"],
            ["strcpy(dst, src)", "copie", "dst assez grand !"],
            ["strncpy", "copie bornée", "peut oublier '\\0'"],
            ["strcmp(a,b)", "ordre lexico", "0 = égal, <0 si a<b"],
            ["strcat(dst, src)", "concatène", "débordement fréquent"],
            ["strchr(s,c)", "1re occurrence", "NULL si absent"],
          ],
        },
        {
          t: "example",
          title: "Palindrome",
          blocks: [
            {
              t: "code",
              lang: "c",
              code: "int palindrome(const char *s) {\n    int i = 0, j = (int)strlen(s) - 1;\n    while (i < j) {\n        if (s[i] != s[j]) return 0;\n        i++; j--;\n    }\n    return 1;\n}",
            },
            {
              t: "p",
              text: "Deux index qui se croisent. Complexité $O(n)$, mémoire $O(1)$. « kayak » → 1, « sda » → 0.",
            },
          ],
        },
        {
          t: "callout",
          kind: "exam",
          title: "QCM : sizeof(\"AB\")",
          body: "`sizeof(\"AB\")` vaut **3** (A, B, `\\0`). `strlen(\"AB\")` vaut **2**. Cette distinction tombe quasiment à chaque session.",
        },
      ],
      quiz: [
        {
          id: "a3q1",
          question: "Quels sont les indices valides de int t[10] ?",
          options: ["1 à 10", "0 à 10", "0 à 9", "0 à 11"],
          answer: 2,
          explain: "n cases indexées 0 … n-1.",
        },
        {
          id: "a3q2",
          question: "strlen(\"C\") vaut…",
          options: ["0", "1", "2", "sizeof(char)"],
          answer: 1,
          explain: "Un caractère visible. Le '\\0' n’est pas compté par strlen.",
        },
        {
          id: "a3q3",
          question: "strcmp(a,b) == 0 signifie",
          options: [
            "a est plus court que b",
            "les deux chaînes sont égales",
            "a est NULL",
            "erreur",
          ],
          answer: 1,
          explain: "0 = égalité lexicographique (contenu identique).",
        },
        {
          id: "a3q4",
          question: "Pourquoi (double)s / n et pas s / n pour une moyenne d’entiers ?",
          options: [
            "Pour arrondir au-dessus",
            "Sinon division entière (troncature)",
            "scanf l’exige",
            "aucune différence",
          ],
          answer: 1,
          explain: "int / int → int. Le cast force une division flottante.",
        },
      ],
      exercises: [
        {
          id: "a3e1",
          title: "Maximum et son indice",
          difficulty: "facile",
          durationMin: 10,
          prompt:
            "Lire n puis n entiers. Afficher le maximum et l’indice de sa première occurrence (base 0).",
          solution:
            "int n, t[100]; scanf(\"%d\", &n);\nfor (int i = 0; i < n; i++) scanf(\"%d\", &t[i]);\nint imax = 0;\nfor (int i = 1; i < n; i++) if (t[i] > t[imax]) imax = i;\nprintf(\"%d %d\\n\", t[imax], imax);",
        },
        {
          id: "a3e2",
          title: "Inverser une chaîne sur place",
          difficulty: "moyen",
          durationMin: 12,
          prompt:
            "Écrire void reverse(char *s) qui inverse s in-place, sans tableau auxiliaire.",
          hint: "Échanger s[i] et s[j] en avançant i et en reculant j.",
          solution:
            "void reverse(char *s) {\n    int i = 0, j = (int)strlen(s) - 1;\n    while (i < j) {\n        char c = s[i]; s[i] = s[j]; s[j] = c;\n        i++; j--;\n    }\n}",
        },
      ],
    },
    {
      id: "fonctions",
      title: "Chapitre 4 — Fonctions et récursivité",
      subtitle: "Passage par valeur, prototypes, pile",
      durationMin: 40,
      objectives: [
        "Déclarer un prototype",
        "Comprendre le passage par valeur",
        "Écrire et tracer une récursion",
      ],
      blocks: [
        {
          t: "h2",
          text: "Anatomie d’une fonction",
          id: "fn",
        },
        {
          t: "code",
          lang: "c",
          title: "Prototype + définition",
          code: "int max2(int a, int b);          /* prototype */\n\nint max2(int a, int b) {         /* définition */\n    return (a > b) ? a : b;\n}",
        },
        {
          t: "p",
          text: "Sans prototype, un compilateur C ancien suppose `int f()` — source de bugs. Place les prototypes **avant** `main`, les définitions après (ou tout avant `main`).",
        },
        {
          t: "callout",
          kind: "key",
          title: "Passage par valeur",
          body: "En C, les arguments sont **copiés**. `void incr(int x) { x++; }` ne modifie pas la variable de l’appelant. Pour modifier : passer un **pointeur** `void incr(int *x) { (*x)++; }` et appeler `incr(&n)`.",
        },
        {
          t: "h2",
          text: "Récursivité",
          id: "rec",
        },
        {
          t: "p",
          text: "Une fonction récursive a **toujours** : (1) un **cas de base** qui termine, (2) un **appel** sur un problème plus petit. Oublier le cas de base → pile d’appels infinie (stack overflow).",
        },
        {
          t: "formula",
          name: "Factorielle",
          tex: "n! = n \\times (n-1)! \\quad\\text{et}\\quad 0! = 1",
        },
        {
          t: "code",
          lang: "c",
          code: "long fact(int n) {\n    if (n <= 1) return 1;          /* cas de base */\n    return n * fact(n - 1);        /* appel récursif */\n}",
        },
        {
          t: "p",
          text: "Fibonacci naïf `fib(n) = fib(n-1)+fib(n-2)` est $O(\\varphi^n)$ — **exponentiel**. Au concours, on attend que tu le saches et que tu proposes la version itérative $O(n)$.",
        },
        {
          t: "example",
          title: "Trace de fact(3)",
          blocks: [
            {
              t: "p",
              text: "`fact(3)` → `3 * fact(2)` → `3 * (2 * fact(1))` → `3 * (2 * 1)` = **6**. La pile empile 3 cadres puis dépile en multipliant.",
            },
          ],
        },
        {
          t: "callout",
          kind: "tip",
          title: "Astuce",
          body: "Toute récursion simple (un appel en queue) se réécrit en `while`. Si on te demande « convertir en itératif », déroule la pile en une boucle.",
        },
        {
          t: "h3",
          text: "Récursion sur un tableau",
        },
        {
          t: "code",
          lang: "c",
          title: "Somme récursive",
          code: "int somme(int t[], int n) {\n    if (n == 0) return 0;\n    return t[n - 1] + somme(t, n - 1);\n}",
        },
      ],
      quiz: [
        {
          id: "a4q1",
          question: "void f(int x){ x = 0; }  appelée par f(n);  n est-il modifié ?",
          options: ["Oui", "Non, passage par valeur (copie)", "Seulement si n est global", "Oui en C99"],
          answer: 1,
          explain: "x est une copie locale. n dans l’appelant est inchangé.",
        },
        {
          id: "a4q2",
          question: "Quel est le cas de base de fact(n) ?",
          options: ["n == 2", "n <= 1 (0! = 1! = 1)", "n == -1", "il n’y en a pas"],
          answer: 1,
          explain: "0! = 1 et 1! = 1. On arrête la récursion là.",
        },
        {
          id: "a4q3",
          question: "Complexité de fibonacci naïf récursif ?",
          options: ["O(n)", "O(n log n)", "O(φⁿ) exponentielle", "O(1)"],
          answer: 2,
          explain: "L’arbre d’appels double presque à chaque niveau.",
        },
        {
          id: "a4q4",
          question: "À quoi sert un prototype ?",
          options: [
            "À accélérer l’exécution",
            "À déclarer la signature avant l’usage (type de retour et paramètres)",
            "À allouer la pile",
            "C’est obligatoire pour main",
          ],
          answer: 1,
          explain: "Le compilateur doit connaître la signature au moment de l’appel.",
        },
      ],
      exercises: [
        {
          id: "a4e1",
          title: "Puissance récursive",
          difficulty: "moyen",
          durationMin: 12,
          prompt:
            "Écrire long puiss(int a, int n) qui calcule a^n. Version O(n) acceptée ; bonus O(log n) par exponentiation rapide.",
          hint: "a^n = a × a^{n-1}, et a^0 = 1. Rapide : si n pair, (a^{n/2})².",
          solution:
            "long puiss(int a, int n) {\n    if (n == 0) return 1;\n    long h = puiss(a, n / 2);\n    long r = h * h;\n    if (n % 2) r *= a;\n    return r;\n}",
        },
      ],
    },
    {
      id: "pointeurs",
      title: "Chapitre 5 — Pointeurs et mémoire",
      subtitle: "*, &, malloc, pièges",
      durationMin: 45,
      objectives: [
        "Lire et écrire * et & sans hésiter",
        "Allouer et libérer",
        "Éviter dangling / leak / overflow",
      ],
      blocks: [
        {
          t: "callout",
          kind: "exam",
          title: "Chapitre le plus rentable",
          body: "Les pointeurs font **la** différence à l’écrit. Si tu ne dois réviser qu’une chose en C : ce chapitre + le swap + le parcours de chaîne par pointeur.",
        },
        {
          t: "h2",
          text: "Adresse et indirection",
          id: "ptr",
        },
        {
          t: "p",
          text: "Un pointeur est une variable qui contient une **adresse**. `int *p;` : p est un pointeur sur int. `&x` = adresse de x. `*p` = objet pointé.",
        },
        {
          t: "code",
          lang: "c",
          code: "int x = 10;\nint *p = &x;     /* p pointe sur x */\n*p = 20;         /* équivaut à x = 20 */\nprintf(\"%d\", x); /* 20 */",
        },
        {
          t: "table",
          cols: ["Expression", "Type (si p : int*)", "Sens"],
          rows: [
            ["p", "int *", "l’adresse"],
            ["*p", "int", "la valeur pointée"],
            ["&p", "int **", "adresse du pointeur lui-même"],
            ["p + 1", "int *", "adresse de l’entier suivant (sizeof(int) de plus)"],
            ["*(p+i)", "int", "équivalent à p[i]"],
          ],
        },
        {
          t: "example",
          title: "Le swap — à écrire les yeux fermés",
          blocks: [
            {
              t: "code",
              lang: "c",
              code: "void swap(int *a, int *b) {\n    int tmp = *a;\n    *a = *b;\n    *b = tmp;\n}\n/* appel : swap(&x, &y); */",
            },
            {
              t: "p",
              text: "Sans pointeurs, `void swap(int a, int b)` échange des **copies** : sans effet. C’est **la** question cadeau du concours.",
            },
          ],
        },
        {
          t: "h2",
          text: "Pointeurs et tableaux",
          id: "ptr-arr",
        },
        {
          t: "p",
          text: "Dans 99 % des contextes, `t` (tableau) **décroît** en `&t[0]`. D’où `t[i] ≡ *(t+i)`. On peut parcourir une chaîne ainsi :",
        },
        {
          t: "code",
          lang: "c",
          code: "int longueur(const char *s) {\n    const char *p = s;\n    while (*p != '\\0') p++;\n    return (int)(p - s);   /* arithmétique de pointeurs */\n}",
        },
        {
          t: "h2",
          text: "Allocation dynamique",
          id: "heap",
        },
        {
          t: "p",
          text: "La **pile** (stack) : variables locales, automatique, taille limitée. Le **tas** (heap) : `malloc` / `free`, durée de vie contrôlée par le programmeur.",
        },
        {
          t: "code",
          lang: "c",
          code: "int *t = malloc(n * sizeof *t);\nif (t == NULL) return 1;     /* allocation échouée */\n/* ... utilisation ... */\nfree(t);\nt = NULL;                    /* évite dangling pointer */",
        },
        {
          t: "ul",
          items: [
            "**Leak** : malloc sans free.",
            "**Dangling** : free puis utilisation.",
            "**Double free** : free deux fois.",
            "**Oubli de NULL** : malloc peut échouer.",
            "`calloc(n, size)` : comme malloc + mise à 0.",
            "`realloc(p, newsize)` : redimensionne (peut déplacer).",
          ],
        },
        {
          t: "callout",
          kind: "warning",
          title: "sizeof à utiliser ainsi",
          body: "`malloc(n * sizeof *t)` reste correct même si le type de t change. `malloc(n * 4)` est fragile. `malloc(sizeof(t))` alloue un **pointeur** (8 octets), pas le tableau — erreur fréquente.",
        },
      ],
      quiz: [
        {
          id: "a5q1",
          question: "Si int x = 5; int *p = &x; alors *p vaut",
          options: ["l’adresse de x", "5", "l’adresse de p", "indéfini"],
          answer: 1,
          explain: "*p déréférence : on obtient la valeur de x.",
        },
        {
          id: "a5q2",
          question: "Pour que swap modifie x et y, on appelle",
          options: ["swap(x, y)", "swap(*x, *y)", "swap(&x, &y)", "swap(int, int)"],
          answer: 2,
          explain: "On passe les adresses.",
        },
        {
          id: "a5q3",
          question: "Après free(p); que faire ?",
          options: [
            "p[0] = 0",
            "rien, p reste valide",
            "ne plus déréférencer p ; p = NULL est une bonne hygiène",
            "malloc automatiquement",
          ],
          answer: 2,
          explain: "p est dangling. Le mettre à NULL évite un usage accidentel.",
        },
        {
          id: "a5q4",
          question: "t[i] est équivalent à",
          options: ["t + i", "*(t + i)", "&t[i]", "t + *i"],
          answer: 1,
          explain: "Définition même de l’indexation en C.",
        },
      ],
      exercises: [
        {
          id: "a5e1",
          title: "Swap de deux entiers",
          difficulty: "facile",
          durationMin: 8,
          prompt: "Écrire void swap(int *a, int *b) et un main qui lit deux entiers, les échange et les affiche.",
          solution:
            "void swap(int *a, int *b) {\n    int t = *a; *a = *b; *b = t;\n}\nint main(void) {\n    int x, y; scanf(\"%d %d\", &x, &y);\n    swap(&x, &y);\n    printf(\"%d %d\\n\", x, y);\n    return 0;\n}",
        },
        {
          id: "a5e2",
          title: "Tableau dynamique",
          difficulty: "moyen",
          durationMin: 15,
          prompt:
            "Lire n, allouer un tableau de n int, le remplir, afficher la somme, puis free.",
          hint: "Toujours tester malloc != NULL.",
          solution:
            "int n; scanf(\"%d\", &n);\nint *t = malloc(n * sizeof *t);\nif (!t) return 1;\nint s = 0;\nfor (int i = 0; i < n; i++) { scanf(\"%d\", &t[i]); s += t[i]; }\nprintf(\"%d\\n\", s);\nfree(t);",
        },
      ],
    },
    {
      id: "structures",
      title: "Chapitre 6 — Structures, fichiers, listes",
      subtitle: "struct, FILE*, liste chaînée",
      durationMin: 35,
      objectives: [
        "Définir et utiliser une struct",
        "Lire / écrire un fichier texte",
        "Insérer dans une liste simplement chaînée",
      ],
      blocks: [
        {
          t: "h2",
          text: "Structures",
          id: "struct",
        },
        {
          t: "code",
          lang: "c",
          code: "typedef struct {\n    char nom[32];\n    float note;\n} Etudiant;\n\nEtudiant e = {\"Ali\", 14.5};\nprintf(\"%s %.1f\", e.nom, e.note);\n\nEtudiant *p = &e;\nprintf(\"%s\", p->nom);   /* équivaut à (*p).nom */",
        },
        {
          t: "callout",
          kind: "key",
          title: ". vs ->",
          body: "`.` si tu as la struct (valeur). `->` si tu as un **pointeur** sur struct. Confondre les deux est un classique de barème.",
        },
        {
          t: "h2",
          text: "Fichiers",
          id: "files",
        },
        {
          t: "table",
          cols: ["Mode", "Sens"],
          rows: [
            ["\"r\"", "lecture (le fichier doit exister)"],
            ["\"w\"", "écriture (crée / écrase)"],
            ["\"a\"", "ajout en fin"],
            ["\"rb\" / \"wb\"", "binaire"],
          ],
        },
        {
          t: "code",
          lang: "c",
          code: "FILE *f = fopen(\"notes.txt\", \"r\");\nif (f == NULL) { perror(\"fopen\"); return 1; }\nchar nom[32]; float note;\nwhile (fscanf(f, \"%31s %f\", nom, &note) == 2) {\n    printf(\"%s %.2f\\n\", nom, note);\n}\nfclose(f);",
        },
        {
          t: "h2",
          text: "Liste simplement chaînée",
          id: "list",
        },
        {
          t: "p",
          text: "Structure récursive : chaque nœud contient une valeur et un pointeur vers le suivant. La liste vide est `NULL`. Insertion en tête : $O(1)$. Recherche : $O(n)$.",
        },
        {
          t: "code",
          lang: "c",
          title: "Insertion en tête",
          code: "typedef struct Noeud {\n    int val;\n    struct Noeud *suiv;\n} Noeud;\n\nNoeud *inserer_tete(Noeud *tete, int x) {\n    Noeud *n = malloc(sizeof *n);\n    n->val = x;\n    n->suiv = tete;\n    return n;                 /* nouvelle tête */\n}",
        },
        {
          t: "p",
          text: "Parcours : `for (Noeud *p = tete; p != NULL; p = p->suiv) printf(\"%d \", p->val);`. Libération : while en sauvant `p->suiv` **avant** le free.",
        },
        {
          t: "callout",
          kind: "tip",
          title: "Astuce concours",
          body: "Si on demande « insérer en queue », parcours jusqu’à `p->suiv == NULL` puis `p->suiv = n`. N’oublie pas le cas liste vide (tete == NULL).",
        },
      ],
      quiz: [
        {
          id: "a6q1",
          question: "Si p est Etudiant*, on accède au nom par",
          options: ["p.nom", "p->nom", "*p.nom", "p::nom"],
          answer: 1,
          explain: "Flèche pour un pointeur sur struct.",
        },
        {
          id: "a6q2",
          question: "fopen en mode \"w\" sur un fichier existant",
          options: [
            "échoue",
            "ouvre en lecture",
            "écrase le contenu",
            "ajoute à la fin",
          ],
          answer: 2,
          explain: "\"w\" truncate. Pour ajouter : \"a\".",
        },
        {
          id: "a6q3",
          question: "Complexité de l’insertion en tête d’une liste chaînée",
          options: ["O(1)", "O(n)", "O(log n)", "O(n²)"],
          answer: 0,
          explain: "On relie le nouveau nœud à l’ancienne tête.",
        },
        {
          id: "a6q4",
          question: "Sentinelle d’une liste vide",
          options: ["0", "NULL", "\\0", "tete->suiv"],
          answer: 1,
          explain: "La tête vaut NULL.",
        },
      ],
      exercises: [
        {
          id: "a6e1",
          title: "Compter les nœuds",
          difficulty: "facile",
          durationMin: 8,
          prompt: "int longueur(Noeud *tete) — parcours et compteur.",
          solution:
            "int longueur(Noeud *p) {\n    int n = 0;\n    while (p) { n++; p = p->suiv; }\n    return n;\n}",
        },
      ],
    },
    {
      id: "algo",
      title: "Chapitre 7 — Algorithmes et complexité",
      subtitle: "O(), recherche, tris",
      durationMin: 45,
      objectives: [
        "Lire et comparer des O()",
        "Implémenter recherche binaire",
        "Connaître les 5 tris du programme",
      ],
      blocks: [
        {
          t: "h2",
          text: "Complexité en temps",
          id: "big-o",
        },
        {
          t: "p",
          text: "La notation $O$ décrit **l’ordre de grandeur** du pire cas, quand $n \\to \\infty$. On ignore les constantes : $3n+12 = O(n)$.",
        },
        {
          t: "formula",
          name: "Hiérarchie (du meilleur au pire)",
          tex: "O(1) \\subset O(\\log n) \\subset O(n) \\subset O(n\\log n) \\subset O(n^2) \\subset O(n^3) \\subset O(2^n) \\subset O(n!)",
        },
        {
          t: "table",
          cols: ["Code typique", "Complexité"],
          rows: [
            ["instruction simple, accès t[i]", "O(1)"],
            ["dichotomie, arbre équilibré", "O(log n)"],
            ["une boucle 0..n", "O(n)"],
            ["tri fusion / rapide moyen", "O(n log n)"],
            ["deux boucles imbriquées n×n (bulle)", "O(n²)"],
            ["fibonacci naïf, sous-ensembles", "O(2ⁿ)"],
          ],
        },
        {
          t: "callout",
          kind: "tip",
          title: "Compter les boucles",
          body: "Une boucle × n → O(n). Deux boucles **imbriquées** indépendantes → O(n²). Deux boucles **successives** → O(n)+O(n)=O(n). Une dichotomie dans une boucle n → O(n log n).",
        },
        {
          t: "h2",
          text: "Recherche",
          id: "search",
        },
        {
          t: "p",
          text: "**Linéaire** : parcourt tout, $O(n)$, tableau non trié OK. **Dichotomique** : tableau **trié**, $O(\\log n)$. Invariant : l’élément est dans `[g, d]` s’il existe.",
        },
        {
          t: "code",
          lang: "c",
          title: "Recherche binaire (itérative)",
          code: "int bsearch_int(int t[], int n, int x) {\n    int g = 0, d = n - 1;\n    while (g <= d) {\n        int m = g + (d - g) / 2;   /* évite overflow */\n        if (t[m] == x) return m;\n        if (t[m] < x) g = m + 1;\n        else d = m - 1;\n    }\n    return -1;\n}",
        },
        {
          t: "h2",
          text: "Tris à connaître",
          id: "sort",
        },
        {
          t: "table",
          cols: ["Tri", "Pire cas", "Stable ?", "Idée"],
          rows: [
            ["Sélection", "O(n²)", "non", "échanger le min du suffixe"],
            ["Insertion", "O(n²) / O(n) déjà trié", "oui", "insérer dans la partie gauche triée"],
            ["Bulle", "O(n²)", "oui", "échanger voisins inversés"],
            ["Fusion (merge)", "O(n log n)", "oui", "diviser, trier, fusionner"],
            ["Rapide (quick)", "O(n²) / moy. O(n log n)", "non", "pivot + partition"],
          ],
        },
        {
          t: "code",
          lang: "c",
          title: "Tri par insertion — souvent demandé",
          code: "void insertion(int t[], int n) {\n    for (int i = 1; i < n; i++) {\n        int x = t[i], j = i;\n        while (j > 0 && t[j - 1] > x) {\n            t[j] = t[j - 1];\n            j--;\n        }\n        t[j] = x;\n    }\n}",
        },
        {
          t: "callout",
          kind: "exam",
          title: "Questions types",
          body: "« Combien de comparaisons dans le pire cas du tri à bulles sur 5 éléments ? » → boucle i de 0 à n-2, j de 0 à n-2-i : $n(n-1)/2 = 10$. Apprends cette formule.",
        },
        {
          t: "formula",
          name: "Comparaisons du tri à bulles (pire cas)",
          tex: "\\frac{n(n-1)}{2}",
        },
      ],
      quiz: [
        {
          id: "a7q1",
          question: "Recherche binaire : précondition indispensable ?",
          options: [
            "tableau de taille paire",
            "tableau trié",
            "éléments uniques",
            "éléments positifs",
          ],
          answer: 1,
          explain: "L’algorithme élimine une moitié grâce à l’ordre.",
        },
        {
          id: "a7q2",
          question: "O(n) + O(n log n) =",
          options: ["O(n)", "O(n log n)", "O(n²)", "O(2n log n) distinct"],
          answer: 1,
          explain: "On garde le terme dominant.",
        },
        {
          id: "a7q3",
          question: "Lequel est O(n log n) dans tous les cas ?",
          options: ["Quicksort", "Tri fusion", "Tri à bulles", "Tri par sélection"],
          answer: 1,
          explain: "Merge sort : toujours n log n. Quicksort dégénère à n².",
        },
        {
          id: "a7q4",
          question: "Pire cas du tri par insertion",
          options: ["tableau déjà trié", "tableau trié à l’envers", "éléments égaux", "n pair"],
          answer: 1,
          explain: "Chaque insertion décale tout le préfixe → O(n²).",
        },
      ],
      exercises: [
        {
          id: "a7e1",
          title: "Recherche binaire",
          difficulty: "moyen",
          durationMin: 15,
          prompt:
            "Écrire une fonction qui retourne l’indice de x dans un tableau trié, ou -1. Version itérative.",
          solution:
            "int cherche(int t[], int n, int x) {\n    int g = 0, d = n - 1;\n    while (g <= d) {\n        int m = g + (d - g) / 2;\n        if (t[m] == x) return m;\n        if (t[m] < x) g = m + 1; else d = m - 1;\n    }\n    return -1;\n}",
        },
        {
          id: "a7e2",
          title: "Compter les comparaisons",
          difficulty: "difficile",
          durationMin: 15,
          prompt:
            "Pour n = 4, combien de comparaisons dans le pire cas du tri par sélection ? Justifier.",
          hint: "Pour i de 0 à n-2, on parcourt n-1-i éléments pour trouver le min.",
          solution:
            "Sélection : (n-1)+(n-2)+…+1 = n(n-1)/2. Pour n=4 : 6 comparaisons.",
        },
      ],
    },
    {
      id: "fiche",
      title: "Chapitre 8 — Fiche express et pièges",
      subtitle: "À relire le matin de l’épreuve",
      durationMin: 25,
      objectives: [
        "Réviser les 15 pièges qui rapportent des points",
        "Avoir les squelettes sous les yeux",
      ],
      blocks: [
        {
          t: "h2",
          text: "Les 15 pièges qui tombent",
          id: "traps",
        },
        {
          t: "ol",
          items: [
            "`scanf(\"%d\", n)` sans `&`",
            "`if (x = 0)` au lieu de `==`",
            "`int / int` oublié (moyenne tronquée)",
            "`i++` vs `++i` dans un `printf`",
            "Indice `t[n]` sur un tableau de n cases",
            "`sizeof(\"AB\")` = 3, `strlen` = 2",
            "swap par valeur (sans pointeurs)",
            "Oubli du `'\\0'` après copie manuelle",
            "`malloc` sans `NULL` check, oubli de `free`",
            "`sizeof(t)` dans une fonction (pointeur, pas tableau)",
            "Récursion sans cas de base",
            "Recherche binaire sur tableau **non** trié",
            "`p.champ` alors que p est un pointeur (`p->champ`)",
            "Boucle `for (i=0; i<=n; i++)` → un tour de trop",
            "Comparer des chaînes avec `==` au lieu de `strcmp`",
          ],
        },
        {
          t: "h2",
          text: "Squelettes à recopier vite",
          id: "skel",
        },
        {
          t: "code",
          lang: "c",
          title: "Parcours + min / max / somme",
          code: "int min = t[0], max = t[0], s = 0;\nfor (int i = 0; i < n; i++) {\n    s += t[i];\n    if (t[i] < min) min = t[i];\n    if (t[i] > max) max = t[i];\n}",
        },
        {
          t: "code",
          lang: "c",
          title: "Compter / filtrer",
          code: "int c = 0;\nfor (int i = 0; i < n; i++)\n    if (t[i] % 2 == 0) c++;",
        },
        {
          t: "h2",
          text: "Méthode de 40 secondes sur un QCM code",
          id: "method",
        },
        {
          t: "ol",
          items: [
            "Encadre les indices de boucles : première valeur, dernière, nombre de tours.",
            "Dresse le tableau d’état (3–4 variables max).",
            "Repère `=` vs `==`, `i++` dans un test, `break`.",
            "Vérifie les `'\\0'`, `&`, `NULL`.",
            "Si deux réponses semblent justes : cherche l’undefined behavior.",
          ],
        },
        {
          t: "callout",
          kind: "exam",
          title: "Gestion du temps (épreuve C)",
          body: "QCM d’abord (points rapides). Ensuite les fonctions courtes (swap, palindrome, PGCD). Les algos longs (tri, liste) si le temps reste. Ne reste pas 20 min sur un pointeur double.",
        },
      ],
      quiz: [
        {
          id: "a8q1",
          question: "strcmp(a, b) == 0 vs a == b pour deux char[] ?",
          options: [
            "équivalent",
            "a == b compare les adresses, strcmp le contenu",
            "a == b est préférable",
            "strcmp ne marche pas sur char[]",
          ],
          answer: 1,
          explain: "== sur tableaux/pointeurs compare les adresses.",
        },
        {
          id: "a8q2",
          question: "for (i = 0; i <= n; i++) sur t[n] provoque",
          options: [
            "rien",
            "un accès t[n] hors bornes",
            "une erreur de compilation toujours",
            "un tri",
          ],
          answer: 1,
          explain: "i va jusqu’à n inclus.",
        },
        {
          id: "a8q3",
          question: "Meilleure première action face à un code QCM",
          options: [
            "réécrire le programme",
            "tracer un tableau d’état",
            "compter les lignes",
            "regarder les options au hasard",
          ],
          answer: 1,
          explain: "La trace systématique évite les pièges d’incrément.",
        },
        {
          id: "a8q4",
          question: "Quelle complexité pour 3 boucles imbriquées indépendantes de 1..n ?",
          options: ["O(n)", "O(n log n)", "O(n³)", "O(3n)"],
          answer: 2,
          explain: "n × n × n.",
        },
      ],
      exercises: [
        {
          id: "a8e1",
          title: "Auto-test : que affiche ce programme ?",
          difficulty: "moyen",
          durationMin: 10,
          prompt:
            "int a = 2, b = 3, *p = &a, *q = &b;\n*p = *q;\nq = p;\n*q = 5;\nprintf(\"%d %d\", a, b);\nDonner l’affichage et justifier.",
          solution:
            "*p = *q  → a = 3 (b inchangé).\nq = p     → q pointe aussi sur a.\n*q = 5    → a = 5, b reste 3.\nAffiche : 5 3",
        },
      ],
    },
  ],
};
