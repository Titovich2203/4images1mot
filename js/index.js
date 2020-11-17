//const img = document.getElementsByClassName('tableLettre')
const table = document.querySelectorAll('.tableLettre')
var mots = ['ÉTÉ', 'BALLON', 'MATIN', 'MARIAGE', 'ORIGAMI'];
var images = [
    ['ete.jpg', 'ete.jpg', 'ete.jpg', 'ete.jpg'],
    ['ballon.jpg', 'M.jpg', 'ballon.jpg', 'ballon.jpg', ],
    ['matin.jpg', 'matin.jpg', 'matin.jpg', 'matin.jpg', ],
    ['mariage.jpg', 'mariage.jpg', 'mariage.jpg', 'mariage.jpg', ],
    ['origami.jpg', 'origami.jpg', 'origami.jpg', 'origami.jpg', ],
];
var lettres = [
    ['A', 'Z', 'T', 'É', 'R', 'H', 'S', 'É', 'B', 'U'],
    ['A', 'L', 'T', 'L', 'O', 'H', 'S', 'É', 'B', 'N'],
    ['A', 'Z', 'T', 'M', 'R', 'H', 'S', 'I', 'B', 'N'],
    ['A', 'M', 'G', 'É', 'R', 'H', 'I', 'E', 'B', 'A'],
    ['A', 'O', 'T', 'É', 'R', 'I', 'I', 'G', 'B', 'M'],
];
//console.log(lettres);
var niveau = -1;
var choix = document.getElementsByClassName("choix");
var choisi = document.getElementsByClassName("case");
var nbrLettreSaisi = 0;
function nextlevel()
{
    niveau++;
    if(niveau > 4)
    {
        niveau = 0;
    }
    initialiseNiveau(niveau);
}
function initialiseNiveau(x)
{
    var img = document.getElementsByClassName("imageJeu");
    for(let i=0; i<img.length; i++)
    {
        var chemin = "img/";
        var image = chemin+images[x][i];
        img[i].setAttribute('src',image);
    }
    
    var cases = document.getElementsByClassName("choix");
    for(let i=0; i<cases.length; i++)
    {
        cases[i].textContent = lettres[x][i];
        cases[i].setAttribute('ok','1');
    }
    
    var divLettres = document.getElementById('divLettreReponse');
    divLettres.innerHTML = '';
    
    for(let i=0; i<mots[x].length; i++)
    {
        divLettres.innerHTML += '<a class="case" ok="0"></a>';
    }
    nbrLettreSaisi = 0;
    choix = document.getElementsByClassName("choix");
    choisi = document.getElementsByClassName("case");
    for(let i=0; i<choix.length; i++)
    {
        choix[i].onclick = function()
        {
            if(choix[i].getAttribute('ok') === '1')
            {
                pos = -1;
                for(let j=0; j<choisi.length; j++)
                {
                    if(choisi[j].getAttribute('ok') === '0')
                    {
                        pos = j;
                        break;
                    }
                }
                if(pos !== -1)
                {
                    choisi[pos].textContent = choix[i].textContent;
                    choisi[pos].setAttribute('ok','1');
                    choix[i].setAttribute('ok','0');
                    choix[i].textContent = '';
                    nbrLettreSaisi++;
                    if(nbrLettreSaisi === mots[niveau].length)
                    {
                        verifierMot();
                    }
                }
            }
        }
    }

    for(let i=0; i<choisi.length; i++)
    {
        choisi[i].onclick = function()
        {
            if(choisi[i].getAttribute('ok') === '1')
            {
                pos = -1;
                for(let j=0; j<choix.length; j++)
                {
                    if(choix[j].getAttribute('ok') === '0')
                    {
                        pos = j;
                        break;
                    }
                }
                if(pos !== -1)
                {
                    choix[pos].textContent = choisi[i].textContent;
                    choix[pos].setAttribute('ok','1');
                    choisi[i].setAttribute('ok','0');
                    choisi[i].textContent = '';
                    nbrLettreSaisi--;
                }
            }
        }
    }
}
function verifierMot()
{
    var lemot = "";
    for(let i=0; i<choisi.length; i++)
    {
        lemot += choisi[i].textContent;
    }
    if(lemot == mots[niveau])
    {
        nextlevel();
    }
    else{
        initialiseNiveau(niveau);
    }
}


nextlevel();

//document.getElementById('test').onclick = function()
//{
//    nextlevel();
//}