import type { Subject } from "./types";

export const stats: Subject = {
  id: "stats",
  short: "Statistique",
  title: "Statistique et analyse",
  color: "stats",
  description:
    "Descriptif, probabilités, lois usuelles, estimation, tests et régression — le socle quantitatif du master SDA.",
  examFocus:
    "On calcule (moyenne, variance, probas conditionnelles), on reconnaît une loi, on pose $H_0/H_1$, on lit une p-valeur. Les formules doivent sortir sans hésiter.",
  learn: [
    "Statistique descriptive (tendance, dispersion, forme)",
    "Probabilités et conditionnement, Bayes",
    "Variables aléatoires discrètes et continues",
    "Lois usuelles (Bernoulli, binomiale, Poisson, normale, exp.)",
    "Estimation et intervalles de confiance",
    "Tests d’hypothèses",
    "Régression linéaire simple",
  ],
  tips: [
    "Écris toujours l’événement en français, puis en symboles, puis calcule.",
    "Variance : $V(X)=E[X^2]-(E[X])^2$ — plus rapide que la définition.",
    "Normale : tout ramener à $Z=(X-\\mu)/\\sigma$ puis table $\\Phi$.",
    "Un test : $H_0$ (égalité / innocence), $H_1$, seuil $\\alpha$, règle, conclusion en français.",
    "n grand, p petit : $B(n,p) \\approx P(\\lambda=np)$.",
    "Ne confonds pas écart-type $\\sigma$ et erreur-type $\\sigma/\\sqrt{n}$.",
  ],
  chapters: [
    {
      id: "descriptive",
      title: "Chapitre 1 — Statistique descriptive",
      subtitle: "Moyenne, médiane, variance, quartiles",
      durationMin: 35,
      objectives: [
        "Calculer les indicateurs de tendance et de dispersion",
        "Lire un histogramme / une boîte à moustaches",
        "Distinguer population et échantillon",
      ],
      blocks: [
        {
          t: "h2",
          text: "Population vs échantillon",
          id: "pop",
        },
        {
          t: "p",
          text: "La **population** a des paramètres ($\\mu$, $\\sigma$). L’**échantillon** de taille $n$ donne des **statistiques** ($\\bar{x}$, $s$) qui **estiment** les paramètres. Au concours, $n$ petit ⇒ on garde $n-1$ (quasi-variance).",
        },
        {
          t: "h2",
          text: "Tendance centrale",
          id: "center",
        },
        {
          t: "formula",
          name: "Moyenne empirique",
          tex: "\\bar{x} = \\frac{1}{n}\\sum_{i=1}^n x_i",
        },
        {
          t: "ul",
          items: [
            "**Médiane** $m$ : 50 % des obs. de chaque côté. Robuste aux outliers (la moyenne non).",
            "**Mode** : valeur la plus fréquente. Utile pour le qualitatif.",
            "**Moyenne pondérée / groupée** : $\\bar{x} = \\sum n_i c_i / n$ (centres de classes).",
          ],
        },
        {
          t: "h2",
          text: "Dispersion",
          id: "disp",
        },
        {
          t: "formula",
          name: "Variance d’échantillon (sans biais)",
          tex: "s^2 = \\frac{1}{n-1}\\sum_{i=1}^n (x_i-\\bar{x})^2 = \\frac{1}{n-1}\\Big(\\sum x_i^2 - n\\bar{x}^2\\Big)",
        },
        {
          t: "formula",
          name: "Écart-type, coefficient de variation, IQR",
          tex: "s = \\sqrt{s^2},\\quad CV = \\frac{s}{\\bar{x}},\\quad IQR = Q_3-Q_1",
        },
        {
          t: "p",
          text: "Sur une **population** on divise par $N$ (et on note $\\sigma^2$). Sur un **échantillon**, par $n-1$ (correction de Bessel). Si l’énoncé dit « série exhaustive », $/n$ ; s’il dit « échantillon », $/n-1$.",
        },
        {
          t: "example",
          title: "Série 2, 4, 4, 4, 5, 5, 7, 9",
          blocks: [
            {
              t: "p",
              text: "$n=8$, $\\sum x=40$, $\\bar{x}=5$. Médiane = $(4+5)/2=4{,}5$. $\\sum x^2=232$, $s^2=(232-8\\times 25)/7=(232-200)/7=32/7\\approx 4{,}57$, $s\\approx 2{,}14$.",
            },
          ],
        },
        {
          t: "h2",
          text: "Forme et graphiques",
          id: "shape",
        },
        {
          t: "ul",
          items: [
            "**Skewness** : queue à droite (salaire) ⇒ moyenne > médiane.",
            "**Boîte à moustaches** : $Q_1$, $m$, $Q_3$, moustaches à $1{,}5\\,IQR$. Points au-delà = outliers.",
            "**Histogramme** : classes, aires proportionnelles aux effectifs.",
            "Variable **qualitative** : diagramme en barres / camembert (effectifs, fréquences).",
          ],
        },
        {
          t: "callout",
          kind: "tip",
          title: "Astuce",
          body: "Si on te donne $\\sum x$ et $\\sum x^2$, n’essaie pas de reconstruire la série. Branche directement la formule de Koenig : $s^2 = \\frac{1}{n-1}(\\sum x^2 - n\\bar{x}^2)$.",
        },
      ],
      quiz: [
        {
          id: "s1q1",
          question: "La médiane est plus robuste que la moyenne car",
          options: [
            "elle utilise toutes les valeurs",
            "elle dépend peu des valeurs extrêmes",
            "elle est toujours plus grande",
            "elle vaut σ",
          ],
          answer: 1,
          explain: "Un outlier déplace la moyenne, pas (beaucoup) la médiane.",
        },
        {
          id: "s1q2",
          question: "Pour un échantillon, la variance sans biais divise par",
          options: ["n", "n-1", "n+1", "√n"],
          answer: 1,
          explain: "Correction de Bessel.",
        },
        {
          id: "s1q3",
          question: "IQR =",
          options: ["Q3 + Q1", "Q3 − Q1", "max − min", "s²"],
          answer: 1,
          explain: "Écart interquartile.",
        },
        {
          id: "s1q4",
          question: "Distribution étalée à droite : typiquement",
          options: ["moyenne < médiane", "moyenne > médiane", "moyenne = mode", "s = 0"],
          answer: 1,
          explain: "La queue droite tire la moyenne.",
        },
      ],
      exercises: [
        {
          id: "s1e1",
          title: "Calcul rapide",
          difficulty: "facile",
          durationMin: 10,
          prompt: "n=5, valeurs 3, 5, 6, 8, 8. Calculer moyenne, médiane, s² (échantillon).",
          solution:
            "moyenne = 30/5 = 6. Médiane = 6.\n∑x² = 9+25+36+64+64 = 198.\ns² = (198 - 5×36)/4 = (198-180)/4 = 18/4 = 4,5. s=√4,5≈2,12.",
        },
      ],
    },
    {
      id: "probas",
      title: "Chapitre 2 — Probabilités",
      subtitle: "Axiomes, conditionnement, Bayes, indépendance",
      durationMin: 40,
      objectives: [
        "Utiliser les axiomes et le complémentaire",
        "Appliquer Bayes",
        "Reconnaître l’indépendance",
      ],
      blocks: [
        {
          t: "formula",
          name: "Axiomes de Kolmogorov (Ω fini)",
          tex: "P(\\Omega)=1,\\; P(A)\\ge 0,\\; A\\cap B=\\emptyset \\Rightarrow P(A\\cup B)=P(A)+P(B)",
        },
        {
          t: "formula",
          name: "Formules de base",
          tex: "P(A^c)=1-P(A),\\quad P(A\\cup B)=P(A)+P(B)-P(A\\cap B)",
        },
        {
          t: "h2",
          text: "Conditionnement",
          id: "cond",
        },
        {
          t: "formula",
          name: "Définition",
          tex: "P(A\\mid B) = \\frac{P(A\\cap B)}{P(B)} \\quad (P(B)>0)",
        },
        {
          t: "formula",
          name: "Formule des probabilités totales",
          tex: "P(B) = \\sum_i P(B\\mid A_i)P(A_i) \\quad\\text{si }(A_i)\\text{ partitionne }\\Omega",
        },
        {
          t: "formula",
          name: "Bayes",
          tex: "P(A_i\\mid B) = \\frac{P(B\\mid A_i)P(A_i)}{\\sum_j P(B\\mid A_j)P(A_j)}",
        },
        {
          t: "example",
          title: "Test médical (le classique)",
          blocks: [
            {
              t: "p",
              text: "Maladie $M$ avec $P(M)=0{,}01$. Test : $P(+|M)=0{,}99$ (sensibilité), $P(+|M^c)=0{,}05$ (faux positifs). Alors",
            },
            {
              t: "math",
              tex: "P(M\\mid +)=\\frac{0{,}99\\times 0{,}01}{0{,}99\\times 0{,}01 + 0{,}05\\times 0{,}99}=\\frac{0{,}0099}{0{,}0099+0{,}0495}\\approx 0{,}167",
            },
            {
              t: "p",
              text: "Seulement **17 %**. Intuition : les faux positifs (5 % de 99 % de sains) noient les vrais positifs. Le jury adore cet exemple.",
            },
          ],
        },
        {
          t: "h2",
          text: "Indépendance",
          id: "indep",
        },
        {
          t: "formula",
          name: "A et B indépendants",
          tex: "P(A\\cap B)=P(A)P(B) \\iff P(A\\mid B)=P(A)",
          note: "Ne pas confondre avec disjoint (A∩B=∅). Deux événements disjoints de proba >0 ne sont PAS indépendants.",
        },
        {
          t: "callout",
          kind: "warning",
          title: "Piège",
          body: "Disjoint ≠ indépendant. Si A et B sont incompatibles et P(A)>0, alors P(A|B)=0 ≠ P(A).",
        },
        {
          t: "h3",
          text: "Dénombrement express",
        },
        {
          t: "formula",
          name: "Permutations, arrangements, combinaisons",
          tex: "n!,\\quad A_n^k=\\frac{n!}{(n-k)!},\\quad \\binom{n}{k}=\\frac{n!}{k!(n-k)!}",
        },
      ],
      quiz: [
        {
          id: "s2q1",
          question: "P(A ∪ B) si A et B non disjoints",
          options: ["P(A)+P(B)", "P(A)+P(B)−P(A∩B)", "P(A)P(B)", "1−P(A)"],
          answer: 1,
          explain: "On retire l’intersection comptée deux fois.",
        },
        {
          id: "s2q2",
          question: "Deux événements incompatibles de proba > 0 sont",
          options: ["indépendants", "non indépendants", "sûrs", "équiprobables"],
          answer: 1,
          explain: "P(A∩B)=0 ≠ P(A)P(B).",
        },
        {
          id: "s2q3",
          question: "Bayes sert à",
          options: [
            "calculer une moyenne",
            "inverser le conditionnement P(cause | effet)",
            "estimer σ",
            "tracer un histogramme",
          ],
          answer: 1,
          explain: "Des vraisemblances vers les postérieures.",
        },
        {
          id: "s2q4",
          question: "P(A|B) n’est définie que si",
          options: ["P(A)>0", "P(B)>0", "A⊂B", "A et B disjoints"],
          answer: 1,
          explain: "On divise par P(B).",
        },
      ],
      exercises: [
        {
          id: "s2e1",
          title: "Bayes usine",
          difficulty: "moyen",
          durationMin: 12,
          prompt:
            "Deux machines : A produit 70 % des pièces (3 % de défauts), B 30 % (5 % de défauts). On tire une pièce défectueuse. P(elle vient de B) ?",
          solution:
            "P(B|D) = (0,05×0,30) / (0,03×0,70 + 0,05×0,30) = 0,015 / (0,021+0,015) = 0,015/0,036 = 5/12 ≈ 0,417.",
        },
      ],
    },
    {
      id: "va",
      title: "Chapitre 3 — Variables aléatoires",
      subtitle: "Espérance, variance, discrète vs continue",
      durationMin: 35,
      objectives: [
        "Passer d’une loi à E et V",
        "Utiliser linéarité",
        "Lire une densité et une fonction de répartition",
      ],
      blocks: [
        {
          t: "h2",
          text: "Cas discret",
          id: "disc",
        },
        {
          t: "formula",
          name: "Espérance et variance",
          tex: "E[X]=\\sum x\\,p(x),\\quad V(X)=E[X^2]-(E[X])^2,\\quad E[X^2]=\\sum x^2 p(x)",
        },
        {
          t: "h2",
          text: "Cas continu",
          id: "cont",
        },
        {
          t: "formula",
          name: "Densité f, fonction de répartition F",
          tex: "P(a\\le X\\le b)=\\int_a^b f,\\quad F(x)=P(X\\le x)=\\int_{-\\infty}^x f,\\quad f=F'",
        },
        {
          t: "formula",
          name: "Espérance continue",
          tex: "E[X]=\\int_{-\\infty}^{+\\infty} x f(x)\\,dx",
        },
        {
          t: "p",
          text: "Pour une v.a. continue, $P(X=a)=0$. Donc $P(X\\le a)=P(X<a)$. Ne perds pas de temps à distinguer ≤ et <.",
        },
        {
          t: "h2",
          text: "Linéarité — arme fatale",
          id: "lin",
        },
        {
          t: "formula",
          name: "Toujours vraie, même sans indépendance",
          tex: "E[aX+bY+c] = aE[X]+bE[Y]+c",
        },
        {
          t: "formula",
          name: "Variance : attention au covariance",
          tex: "V(aX+b)=a^2 V(X),\\quad V(X+Y)=V(X)+V(Y)+2\\mathrm{Cov}(X,Y)",
        },
        {
          t: "p",
          text: "Si $X\\perp Y$ (indépendants) : $\\mathrm{Cov}=0$ donc $V(X+Y)=V(X)+V(Y)$. La réciproque est **fausse** (non-corrélation ≠ indépendance).",
        },
        {
          t: "callout",
          kind: "tip",
          title: "Astuce",
          body: "Indicatrice : si $X_i=1$ quand l’épreuve i réussit, $E[\\sum X_i]=\\sum P(X_i=1)$ même corrélés. C’est ainsi qu’on calcule une espérance de dénombrement sans loi explicite.",
        },
        {
          t: "formula",
          name: "Inégalité de Bienaymé-Tchebychev",
          tex: "P\\big(|X-\\mu|\\ge k\\sigma\\big) \\le \\frac{1}{k^2}",
          note: "Borne universelle, souvent lâche. Utile quand on ne connaît pas la loi.",
        },
      ],
      quiz: [
        {
          id: "s3q1",
          question: "E[3X+2] =",
          options: ["3E[X]", "3E[X]+2", "3E[X]+6", "E[X]+2"],
          answer: 1,
          explain: "Linéarité, constante 2.",
        },
        {
          id: "s3q2",
          question: "V(3X+2) =",
          options: ["3V(X)+2", "9V(X)", "9V(X)+2", "3V(X)"],
          answer: 1,
          explain: "La constante disparaît, le 3 est au carré.",
        },
        {
          id: "s3q3",
          question: "Pour X continue, P(X=2) =",
          options: ["f(2)", "F(2)", "0", "1"],
          answer: 2,
          explain: "Masse nulle en un point.",
        },
        {
          id: "s3q4",
          question: "Cov=0 implique-t-il l’indépendance ?",
          options: ["oui toujours", "non, seulement non-corrélation", "oui si discrets", "oui si gaussiens… wait c’est un cas particulier"],
          answer: 1,
          explain:
            "En général non. (Le cas gaussien joint est l’exception où non-corrélation ⇔ indépendance — trop fin pour un QCM, la réponse sûre est « non ».)",
        },
      ],
      exercises: [
        {
          id: "s3e1",
          title: "Loi discrète",
          difficulty: "moyen",
          durationMin: 10,
          prompt:
            "X prend 0,1,2 avec proba 1/2, 1/3, 1/6. Calculer E[X] et V(X).",
          solution:
            "E[X]=0·1/2 + 1·1/3 + 2·1/6 = 0+1/3+1/3=2/3.\nE[X²]=0+1/3+4/6=1/3+2/3=1.\nV=1−(2/3)²=1−4/9=5/9.",
        },
      ],
    },
    {
      id: "lois",
      title: "Chapitre 4 — Lois usuelles",
      subtitle: "Bernoulli, binomiale, Poisson, normale, exponentielle",
      durationMin: 40,
      objectives: [
        "Reconnaître la loi d’après l’énoncé",
        "Connaître E et V par cœur",
        "Passer à la normale centrée réduite",
      ],
      blocks: [
        {
          t: "table",
          caption: "Lois discrètes",
          cols: ["Loi", "Paramètres", "E[X]", "V(X)", "Quand ?"],
          rows: [
            ["Bernoulli B(p)", "p ∈ ]0,1[", "p", "p(1−p)", "succès/échec unique"],
            ["Binomiale B(n,p)", "n, p", "np", "np(1−p)", "n essais indépendants, même p"],
            ["Poisson P(λ)", "λ>0", "λ", "λ", "comptage rare, ou limite binomiale"],
            ["Géométrique (1er succès)", "p", "1/p", "(1−p)/p²", "essais jusqu’au 1er succès"],
          ],
        },
        {
          t: "table",
          caption: "Lois continues",
          cols: ["Loi", "Paramètres", "E[X]", "V(X)", "Densité / rôle"],
          rows: [
            ["Uniforme U[a,b]", "a<b", "(a+b)/2", "(b−a)²/12", "f=1/(b−a)"],
            ["Exponentielle E(λ)", "λ>0", "1/λ", "1/λ²", "durée de vie sans mémoire"],
            ["Normale N(μ,σ²)", "μ, σ>0", "μ", "σ²", "cloche, TLC"],
          ],
        },
        {
          t: "h2",
          text: "Normale — le passage obligé",
          id: "normal",
        },
        {
          t: "formula",
          name: "Centrage-réduction",
          tex: "X\\sim\\mathcal{N}(\\mu,\\sigma^2) \\;\\Rightarrow\\; Z=\\frac{X-\\mu}{\\sigma}\\sim\\mathcal{N}(0,1)",
        },
        {
          t: "p",
          text: "On lit $\\Phi(z)=P(Z\\le z)$ dans la table. Valeurs à connaître : $\\Phi(1{,}96)\\approx 0{,}975$ donc $P(|Z|\\le 1{,}96)=0{,}95$. $\\Phi(1{,}64)\\approx 0{,}95$ (unilatéral 5 %). $\\Phi(2{,}58)\\approx 0{,}995$.",
        },
        {
          t: "formula",
          name: "Règle 68-95-99,7",
          tex: "P(|X-\\mu|<\\sigma)\\approx 0{,}68,\\; <2\\sigma \\approx 0{,}95,\\; <3\\sigma \\approx 0{,}997",
        },
        {
          t: "h2",
          text: "Approximations",
          id: "approx",
        },
        {
          t: "ul",
          items: [
            "**Poisson** : $B(n,p)\\approx P(\\lambda=np)$ si $n\\ge 30$, $p\\le 0{,}1$.",
            "**De Moivre-Laplace** : $B(n,p)\\approx N(np, np(1-p))$ si $np$ et $n(1-p)\\ge 5$ (parfois 10).",
            "**Correction de continuité** : $P(X\\le k)\\approx P(Y\\le k+0{,}5)$ si Y est la normale d’approx.",
            "**TLC** : $\\bar{X} \\approx N(\\mu, \\sigma^2/n)$ dès que $n$ est grand ($n\\ge 30$).",
          ],
        },
        {
          t: "formula",
          name: "Sans mémoire (exponentielle)",
          tex: "P(X>s+t\\mid X>s)=P(X>t)",
        },
        {
          t: "callout",
          kind: "exam",
          title: "Reconnaître en 10 secondes",
          body: "« n pièces, p défectueuse, X=nombre » → binomiale. « arrivals par heure, moyenne λ » → Poisson. « durée, sans usure » → exp. « mesure = moyenne + bruit » → normale. « pile ou face une fois » → Bernoulli.",
        },
      ],
      quiz: [
        {
          id: "s4q1",
          question: "E[B(n,p)] =",
          options: ["p", "np", "np(1-p)", "n"],
          answer: 1,
          explain: "n fois Bernoulli.",
        },
        {
          id: "s4q2",
          question: "Pour X~N(10, 4) (variance 4), P(X≤10) =",
          options: ["0,05", "0,5", "0,95", "Φ(4)"],
          answer: 1,
          explain: "Symétrie autour de μ=10. σ=2 n’intervient pas.",
        },
        {
          id: "s4q3",
          question: "Seuil usuel pour un IC à 95 % (normale)",
          options: ["1,64", "1,96", "2,58", "3"],
          answer: 1,
          explain: "z_{0,025}=1,96.",
        },
        {
          id: "s4q4",
          question: "X~P(λ), V(X) =",
          options: ["λ²", "λ", "√λ", "1/λ"],
          answer: 1,
          explain: "Espérance = variance = λ.",
        },
      ],
      exercises: [
        {
          id: "s4e1",
          title: "Centrage",
          difficulty: "moyen",
          durationMin: 10,
          prompt:
            "X ~ N(50, 16) (σ=4). P(X ≥ 56) en fonction de Φ. Approximation numérique si Φ(1,5)≈0,933.",
          solution:
            "P(X≥56)=P(Z≥(56-50)/4)=P(Z≥1,5)=1−Φ(1,5)≈1−0,933=0,067.",
        },
      ],
    },
    {
      id: "estimation",
      title: "Chapitre 5 — Estimation et intervalles",
      subtitle: "EMV, biais, IC",
      durationMin: 35,
      objectives: [
        "Distinguer estimateur et estimation",
        "Construire un IC pour une moyenne",
        "Savoir quand utiliser t de Student",
      ],
      blocks: [
        {
          t: "p",
          text: "Un **estimateur** $\\hat\\theta$ est une v.a. (fonction de l’échantillon). Une **estimation** est sa valeur numérique. Qualités : **sans biais** $E[\\hat\\theta]=\\theta$, **consistant** (converge en proba), **efficace** (petite variance).",
        },
        {
          t: "formula",
          name: "Erreur quadratique moyenne",
          tex: "\\mathrm{EQM}(\\hat\\theta)=V(\\hat\\theta)+\\mathrm{biais}^2",
        },
        {
          t: "h2",
          text: "Intervalle de confiance pour μ (σ connu)",
          id: "ic",
        },
        {
          t: "formula",
          name: "IC de niveau 1−α",
          tex: "\\bar{x} \\pm z_{1-\\alpha/2}\\,\\frac{\\sigma}{\\sqrt{n}}",
        },
        {
          t: "p",
          text: "σ **inconnu**, $n$ grand : on remplace σ par $s$. $n$ petit, population normale : **Student** $t_{n-1}$ :",
        },
        {
          t: "formula",
          name: "IC Student",
          tex: "\\bar{x} \\pm t_{n-1,\\,1-\\alpha/2}\\,\\frac{s}{\\sqrt{n}}",
        },
        {
          t: "h2",
          text: "Proportion",
          id: "prop",
        },
        {
          t: "formula",
          name: "IC pour p (n grand)",
          tex: "\\hat p \\pm z_{1-\\alpha/2}\\sqrt{\\frac{\\hat p(1-\\hat p)}{n}}",
          note: "\\hat p = k/n. Conditions : n p̂ ≥ 5 et n(1-p̂) ≥ 5.",
        },
        {
          t: "callout",
          kind: "key",
          title: "Erreur-type",
          body: "Ne dis pas « écart-type de l’échantillon » pour $\\sigma/\\sqrt{n}$. C’est l’**erreur-type de la moyenne**. Plus $n$ croît, plus l’IC se resserre en $1/\\sqrt{n}$ : pour diviser la largeur par 2, il faut **4 fois** plus d’observations.",
        },
        {
          t: "example",
          title: "n=100, x̄=12, σ=4, 95 %",
          blocks: [
            {
              t: "math",
              tex: "12 \\pm 1{,}96\\cdot\\frac{4}{\\sqrt{100}} = 12 \\pm 0{,}784 \\;\\Rightarrow\\; [11{,}22;\\,12{,}78]",
            },
          ],
        },
      ],
      quiz: [
        {
          id: "s5q1",
          question: "Un estimateur sans biais vérifie",
          options: ["V(θ̂)=0", "E[θ̂]=θ", "θ̂=θ toujours", "n=30"],
          answer: 1,
          explain: "Espérance égale au paramètre.",
        },
        {
          id: "s5q2",
          question: "Pour quadrupler n, la largeur d’un IC (σ connu) est",
          options: ["divisée par 4", "divisée par 2", "inchangée", "multipliée par 2"],
          answer: 1,
          explain: "1/√n : ×4 sur n ⇒ /2 sur la largeur.",
        },
        {
          id: "s5q3",
          question: "σ inconnu, n=12, population normale : on utilise",
          options: ["N(0,1)", "t de Student à 11 ddl", "Poisson", "χ² à 12 ddl"],
          answer: 1,
          explain: "ddl = n-1 = 11.",
        },
        {
          id: "s5q4",
          question: "z_{1-α/2} pour α=5 %",
          options: ["1,64", "1,96", "2,33", "1"],
          answer: 1,
          explain: "Bilatéral 95 %.",
        },
      ],
      exercises: [
        {
          id: "s5e1",
          title: "IC proportion",
          difficulty: "moyen",
          durationMin: 10,
          prompt:
            "Sur 200 étudiants, 40 disent réviser C tous les jours. IC à 95 % pour p.",
          solution:
            "p̂=0,20. z=1,96. se=√(0,2×0,8/200)=√0,0008=0,0283.\nIC = 0,20 ± 1,96×0,0283 = 0,20 ± 0,055 → [0,145 ; 0,255].",
        },
      ],
    },
    {
      id: "tests",
      title: "Chapitre 6 — Tests d’hypothèses",
      subtitle: "H0, H1, α, p-valeur, z et t",
      durationMin: 40,
      objectives: [
        "Poser H0/H1 correctement",
        "Connaître risques α et β",
        "Mener un z-test / t-test / χ² d’indépendance",
      ],
      blocks: [
        {
          t: "h2",
          text: "Cadre",
          id: "frame",
        },
        {
          t: "ul",
          items: [
            "$H_0$ : hypothèse **à protéger** (souvent égalité, « pas d’effet »).",
            "$H_1$ : ce qu’on cherche à montrer (bilatéral $\\neq$ ou unilatéral $>$ / $<$).",
            "**Risque de 1re espèce** $\\alpha = P(\\text{rejeter }H_0\\mid H_0\\text{ vraie})$. Seuil usuel 5 %.",
            "**Risque de 2e espèce** $\\beta = P(\\text{accepter }H_0\\mid H_1\\text{ vraie})$. Puissance $=1-\\beta$.",
            "On **ne prouve jamais** $H_0$ ; on échoue à la rejeter.",
          ],
        },
        {
          t: "callout",
          kind: "warning",
          title: "Formulation de la conclusion",
          body: "« Au seuil 5 %, on rejette H0 : la moyenne diffère significativement de 10. » ou « on ne peut pas rejeter H0 ». Jamais « H0 est vraie ».",
        },
        {
          t: "h2",
          text: "z-test d’une moyenne (σ connu)",
          id: "ztest",
        },
        {
          t: "formula",
          name: "Statistique",
          tex: "z_{\\mathrm{obs}} = \\frac{\\bar{x}-\\mu_0}{\\sigma/\\sqrt{n}}",
        },
        {
          t: "p",
          text: "Bilatéral 5 % : on rejette si $|z_{obs}|>1{,}96$. Unilatéral à droite : $z_{obs}>1{,}64$. **p-valeur** = proba, sous $H_0$, d’un résultat au moins aussi extrême. On rejette si p-valeur $<\\alpha$.",
        },
        {
          t: "p",
          text: "σ inconnu, n petit : remplacer par $t_{obs}=(\\bar{x}-\\mu_0)/(s/\\sqrt{n})$, comparer à la table Student $n-1$ ddl.",
        },
        {
          t: "h2",
          text: "Test d’une proportion",
          id: "ptest",
        },
        {
          t: "formula",
          tex: "z_{\\mathrm{obs}} = \\frac{\\hat p - p_0}{\\sqrt{p_0(1-p_0)/n}}",
          name: "Sous H0 : p = p0",
        },
        {
          t: "h2",
          text: "Khi-deux d’indépendance",
          id: "chi2",
        },
        {
          t: "formula",
          name: "Tableau de contingence",
          tex: "\\chi^2 = \\sum \\frac{(O_{ij}-E_{ij})^2}{E_{ij}},\\quad E_{ij}=\\frac{n_{i\\cdot}n_{\\cdot j}}{n},\\quad ddl=(r-1)(c-1)",
        },
        {
          t: "p",
          text: "$H_0$ : les deux variables qualitatives sont indépendantes. Conditions : $E_{ij}\\ge 5$ (sinon regrouper des classes). Test d’adéquation : même formule, $ddl=k-1-p$ ($p$ paramètres estimés).",
        },
        {
          t: "callout",
          kind: "tip",
          title: "Méthode 6 lignes sur la copie",
          body: "1. H0 / H1. 2. Seuil α. 3. Statistique et loi sous H0. 4. Calcul. 5. Région critique ou p-valeur. 6. Conclusion en une phrase liée à l’énoncé.",
        },
      ],
      quiz: [
        {
          id: "s6q1",
          question: "α est",
          options: [
            "la puissance",
            "P(rejeter H0 | H0 vraie)",
            "P(accepter H0 | H0 vraie)",
            "la p-valeur",
          ],
          answer: 1,
          explain: "Risque de première espèce.",
        },
        {
          id: "s6q2",
          question: "On rejette H0 (bilatéral 5 %, σ connu) si",
          options: ["|z| < 1,96", "|z| > 1,96", "z > 0", "p > 0,05"],
          answer: 1,
          explain: "Hors de l’intervalle de non-rejet.",
        },
        {
          id: "s6q3",
          question: "ddl d’un χ² d’indépendance 3×4",
          options: ["12", "7", "6", "11"],
          answer: 2,
          explain: "(3-1)×(4-1)=6.",
        },
        {
          id: "s6q4",
          question: "p-valeur < α signifie",
          options: [
            "on accepte H0",
            "on rejette H0 au seuil α",
            "β est petit",
            "l’échantillon est trop petit",
          ],
          answer: 1,
          explain: "Définition opérationnelle du test.",
        },
      ],
      exercises: [
        {
          id: "s6e1",
          title: "z-test",
          difficulty: "moyen",
          durationMin: 12,
          prompt:
            "μ0=10, σ=2, n=25, x̄=10,8. Test bilatéral α=5 % : la moyenne a-t-elle changé ?",
          solution:
            "z=(10,8-10)/(2/5)=0,8/0,4=2.\n|2|>1,96 → on rejette H0. La moyenne diffère significativement de 10 au seuil 5 %.\n(p = 2(1−Φ(2)) ≈ 0,0456 < 0,05.)",
        },
      ],
    },
    {
      id: "regression",
      title: "Chapitre 7 — Régression linéaire simple",
      subtitle: "Droite des moindres carrés, R², résidus",
      durationMin: 30,
      objectives: [
        "Calculer a et b",
        "Interpréter R²",
        "Ne pas confondre corrélation et causalité",
      ],
      blocks: [
        {
          t: "formula",
          name: "Modèle",
          tex: "Y = a + bX + \\varepsilon,\\quad E[\\varepsilon]=0",
        },
        {
          t: "formula",
          name: "Moindres carrés",
          tex: "b = \\frac{\\mathrm{Cov}(x,y)}{s_x^2} = \\frac{\\sum (x_i-\\bar x)(y_i-\\bar y)}{\\sum (x_i-\\bar x)^2},\\quad a=\\bar y - b\\bar x",
        },
        {
          t: "formula",
          name: "Coefficient de corrélation et R²",
          tex: "r = \\frac{\\mathrm{Cov}(x,y)}{s_x s_y} \\in [-1,1],\\quad R^2 = r^2",
          note: "R² = part de variance de Y expliquée par X. R²=0,81 → 81 %.",
        },
        {
          t: "p",
          text: "La droite passe par $(\\bar x, \\bar y)$. $b$ = variation moyenne de $Y$ quand $X$ augmente de 1. Résidus $e_i=y_i-\\hat y_i$ : on les veut sans structure (sinon linéarité douteuse).",
        },
        {
          t: "callout",
          kind: "warning",
          title: "Causalité",
          body: "Une forte corrélation n’implique pas que X cause Y (variable cachée, causalité inverse). Phrase attendue du jury.",
        },
        {
          t: "ul",
          items: [
            "Hypothèses classiques : linéarité, indépendance des erreurs, homoscédasticité, normalité (pour les tests sur $b$).",
            "Outlier en $x$ = point levier. Il peut basculer $b$.",
            "Régression $Y$ sur $X$ ≠ régression $X$ sur $Y$ (sauf si $|r|=1$).",
          ],
        },
      ],
      quiz: [
        {
          id: "s7q1",
          question: "La droite des MC passe toujours par",
          options: ["(0,0)", "(x̄, ȳ)", "(0, a)", "le mode"],
          answer: 1,
          explain: "Conséquence de a = ȳ − b x̄.",
        },
        {
          id: "s7q2",
          question: "R² = 0,64 signifie",
          options: [
            "r = 0,64",
            "64 % de la variance de Y est expliquée (et |r|=0,8)",
            "b = 0,64",
            "p-valeur = 0,64",
          ],
          answer: 1,
          explain: "R²=r² ⇒ |r|=0,8.",
        },
        {
          id: "s7q3",
          question: "b s’interprète comme",
          options: [
            "un pourcentage",
            "la variation de Y pour +1 en X",
            "un écart-type",
            "une p-valeur",
          ],
          answer: 1,
          explain: "Pente.",
        },
        {
          id: "s7q4",
          question: "r = 0 implique",
          options: [
            "indépendance toujours",
            "pas de liaison linéaire (il peut rester une liaison non linéaire)",
            "a=0",
            "Y constante",
          ],
          answer: 1,
          explain: "La corrélation ne capture que le linéaire.",
        },
      ],
      exercises: [
        {
          id: "s7e1",
          title: "Pente",
          difficulty: "moyen",
          durationMin: 12,
          prompt:
            "n=5. x̄=3, ȳ=8, ∑(x−x̄)(y−ȳ)=10, ∑(x−x̄)²=8. Calculer a, b, et ŷ pour x=4.",
          solution:
            "b=10/8=1,25. a=8−1,25×3=8−3,75=4,25.\nŷ(4)=4,25+1,25×4=9,25.",
        },
      ],
    },
    {
      id: "fiche",
      title: "Chapitre 8 — Fiche formules",
      subtitle: "Une page à revoir le vendredi soir",
      durationMin: 20,
      objectives: ["Tout le formulaire utile au concours"],
      blocks: [
        {
          t: "h2",
          text: "Formulaire compact",
          id: "form",
        },
        {
          t: "math",
          tex: "\\bar x=\\frac{\\sum x}{n},\\quad s^2=\\frac{\\sum x^2-n\\bar x^2}{n-1},\\quad P(A\\cup B)=P(A)+P(B)-P(A\\cap B)",
        },
        {
          t: "math",
          tex: "P(A\\mid B)=\\frac{P(B\\mid A)P(A)}{P(B)},\\quad E[aX+b]=aE[X]+b,\\quad V(aX+b)=a^2V(X)",
        },
        {
          t: "math",
          tex: "B(n,p):\\ np,\\ np(1-p)\\qquad P(\\lambda):\\ \\lambda,\\lambda \\qquad \\mathcal N(\\mu,\\sigma^2):\\ Z=\\frac{X-\\mu}{\\sigma}",
        },
        {
          t: "math",
          tex: "IC:\\ \\bar x\\pm z\\frac{\\sigma}{\\sqrt n}\\qquad z_{test}=\\frac{\\bar x-\\mu_0}{\\sigma/\\sqrt n}\\qquad b=\\frac{\\mathrm{Cov}}{s_x^2},\\ R^2=r^2",
        },
        {
          t: "h2",
          text: "Valeurs numériques à connaître",
          id: "vals",
        },
        {
          t: "table",
          cols: ["Quantile", "Valeur"],
          rows: [
            ["z_{0,90} (unilat. 5 % à gauche… wait) Φ(1,64)≈0,95", "1,64"],
            ["z_{0,975}  (bilatéral 5 %)", "1,96"],
            ["z_{0,995}  (bilatéral 1 %)", "2,58"],
            ["Φ(1)≈0,84  Φ(2)≈0,977", "règle 68-95"],
          ],
        },
        {
          t: "callout",
          kind: "exam",
          title: "Stratégie épreuve",
          body: "Les QCM de lois et de formules d’abord. Un Bayes ensuite (points sûrs si tu poses les 3 nombres). Les tests : écris H0/H1 même si le calcul dérape — le cadre est noté. Régression : calcule b avant a.",
        },
      ],
      quiz: [
        {
          id: "s8q1",
          question: "Erreur-type de x̄",
          options: ["σ", "σ/n", "σ/√n", "s²"],
          answer: 2,
          explain: "Écart-type de la moyenne empirique.",
        },
        {
          id: "s8q2",
          question: "V(X+Y) si X,Y indépendants",
          options: ["V(X)+V(Y)+2Cov", "V(X)+V(Y)", "V(X)V(Y)", "(V(X)+V(Y))²"],
          answer: 1,
          explain: "Cov=0.",
        },
        {
          id: "s8q3",
          question: "n pour diviser par 2 la largeur d’un IC",
          options: ["×2", "×4", "×√2", "/2"],
          answer: 1,
          explain: "Largeur ∝ 1/√n.",
        },
        {
          id: "s8q4",
          question: "Loi de (X−μ)/(σ/√n) si X̄ moyenne i.i.d. normales, σ connu",
          options: ["t_{n-1}", "N(0,1)", "χ²", "P(λ)"],
          answer: 1,
          explain: "C’est le z.",
        },
      ],
      exercises: [
        {
          id: "s8e1",
          title: "Enchaînement",
          difficulty: "difficile",
          durationMin: 15,
          prompt:
            "Notes ~ N(μ, σ=4). n=16, x̄=13. IC 95 % pour μ. Puis tester H0: μ=12 contre H1: μ≠12 à 5 %.",
          solution:
            "IC: 13 ± 1,96×4/4 = 13 ± 1,96 → [11,04 ; 14,96].\nz=(13-12)/(4/4)=1. |1|<1,96 : on ne rejette pas H0.\nCohérent : 12 est dans l’IC.",
        },
      ],
    },
  ],
};
