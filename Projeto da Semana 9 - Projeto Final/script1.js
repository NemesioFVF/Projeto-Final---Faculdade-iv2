var MeuJSON = "";
var champion = "";

fetch("https://ddragon.leagueoflegends.com/cdn/11.3.1/data/pt_BR/champion.json").then(requisicao => requisicao.json()).then(link => {
	MeuJSON = link;
	document.getElementById("SLECTcampi").innerHTML += "<option hidden selected> Selecione um Campeão.... </option>";
	
	for(i in MeuJSON.data){    
    	document.getElementById("SLECTcampi").innerHTML += "<option value='"+ i +"'>"+ i +"</option>";
    }
});

var AIO = false;
var AIO2 = true;
var FIndex = 1;

document.getElementById("SLECTcampi").addEventListener("change", () => {
	champion = document.getElementById("SLECTcampi").value;
  
    fetch("https://ddragon.leagueoflegends.com/cdn/11.3.1/data/pt_BR/champion/"+ champion + ".json").then(requisicao => requisicao.json()).then(link => {
		MeuJSON = link;
		
		Skins();
		Spells();
		Skills();
		
		clearInterval(AIO);

    		document.getElementById("ADDcampi").innerHTML = 
			`
			<div class='divCAMP'>
		
			<h1> ${MeuJSON.data[champion].name} <br> <i>(${MeuJSON.data[champion].title}) </i></h1>
			<br>
					<div class='sobreCAMP'> &nbsp;&nbsp;&nbsp;${MeuJSON.data[champion].lore}

					<h3>Habilidades</h3> ${Spells2()}
					<h3 class='tabelaATN' > Escolha um Nível -  <input type='number' min='1' max='18' value='' onchange='Nivel18(this)'></h3>
						
					<p id='skills' class='tabelaAT'></p>
						<p></p>
					
					</div>
				<div class='IMGCAm'> ${skins}</div>
				<br>
			`
		FIndex = 1;
		Slides2(FIndex);
		Skills2();

        AIO = setInterval(() => {
        	Slides2(FIndex += 1);
        }, 5000);
    });
});

var FotosCH = false;
var skins = "";

function Skins (){
	skins = "<div class='slideIMG'>";

	for(let i = 0; i < MeuJSON.data[champion].skins.length; i++){
    	let atual = { 
			nome: MeuJSON.data[champion].skins[i].name, 
			imagem: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/"+ champion +"_"+ MeuJSON.data[champion].skins[i].num +".jpg" };
    
    	if(i == 0) atual.nome = champion;

		skins += 
		`
		<div class='SlidesCamp'>
			<p class='nomeAL'> ${atual.nome}</p> 
				<br>
				    <a href='${atual.imagem}' target='_blank'> 
				<img src='${atual.imagem}' class='fotosCam'></a> 
		</div>
		`
	}
	
	FotosCH = true;
}

var passive = "";
var spells = [];

function Spells (){

	for(let i = 0; i < MeuJSON.data[champion].spells.length; i++){
    	let atual = { 
			nome: MeuJSON.data[champion].spells[i].name, 
			descricao: MeuJSON.data[champion].spells[i].description, 
			imagem: "https://ddragon.leagueoflegends.com/cdn/11.3.1/img/spell/"+ MeuJSON.data[champion].spells[i].image.full 
		};
    
    	spells.push(atual);
	}
  
	passive = { 
		nome: MeuJSON.data[champion].passive.name, 
		descricao: MeuJSON.data[champion].passive.description, 
		imagem: "https://ddragon.leagueoflegends.com/cdn/11.3.1/img/passive/"+ MeuJSON.data[champion].passive.image.full 
	};
}

var a = {};
var a2 = {};

function Skills(){
	a = { 
    	hp: MeuJSON.data[champion].stats.hp, 
		hpup: MeuJSON.data[champion].stats.hpperlevel, 
    	mp: MeuJSON.data[champion].stats.mp, 
		mpup: MeuJSON.data[champion].stats.mpperlevel, 
	    speed: MeuJSON.data[champion].stats.movespeed, 
	    armor: MeuJSON.data[champion].stats.armor, 
		armorup: MeuJSON.data[champion].stats.armorperlevel, 
	    splblock: MeuJSON.data[champion].stats.spellblock, 
		splblockup: MeuJSON.data[champion].stats.spellblockperlevel, 
    	atkrng: MeuJSON.data[champion].stats.attackrange, 
	    hpreg: MeuJSON.data[champion].stats.hpregen, 
		hpregup: MeuJSON.data[champion].stats.hpregenperlevel, 
    	mpreg: MeuJSON.data[champion].stats.mpregen, 
		mpregup: MeuJSON.data[champion].stats.mpregen, 
    	atkdmg: MeuJSON.data[champion].stats.attackdamage, 
		atkdmgup: MeuJSON.data[champion].stats.attackdamageperlevel, 
    	atkspd: MeuJSON.data[champion].stats.attackspeed, 
		atkspdup: MeuJSON.data[champion].stats.attackspeedperlevel,
	  };
  
	  a2 = { 
		  hp: a.hp, 
		  mp: a.mp, 
		  speed: a.speed, 
		  armor: a.armor, 
		  splblock: a.splblock, 
		  atkrng: a.atkrng,  
		  hpreg: a.hpreg,  
		  mpreg: a.mpreg,  
		  atkdmg: a.atkdmg, 
		  atkspd: a.atkspd 
		};
}

function Spells2 (){
	let spell = "";

	for(let i = 0; i < spells.length; i++){
    	spell += 
		`
		<img src='${spells[i].imagem}' class='imgHabilidades' id='${spells[i].nome}' title='${spells[i].nome}' onclick='seeDetails(this)'>
		`
  	}
  
	return(
		`
		<div width='100%'>
			<div class='spells'> ${spell}
				<img src='${passive.imagem}' class='imgHabilidades' id='${passive.nome}' title='${passive.nome} ' onload='seeDetails(this)' onclick='seeDetails(this)'>
			</div>
			<p id='details'></p>
		</div>
	`);
}

function seeDetails(e){

	let who = false;
	var DescriHAB = "width: 64px";
	var HabATV = "transform: scale(1.5)";
  
	for (let i = 0; i < spells.length; i++){
		document.getElementById(spells[i].nome).style = DescriHAB;
	}
  
	document.getElementById(passive.nome).style = DescriHAB;
	e.style = HabATV;
  
	if (e.id != passive.nome){
    	for (let i = 0; i < spells.length; i++){
      		if (spells[i].nome == e.id) who = i;
    	}
    	
    	document.getElementById('details').innerHTML = spells[who].descricao;
  	}
  
  	else document.getElementById('details').innerHTML = passive.descricao;
}

function Slides2(n){
	if(FotosCH == true){
    	let i;
    	let slides = document.getElementsByClassName("SlidesCamp");
    
		if(n > slides.length) FIndex = 1;
		if(n < 1) FIndex = slides.length;
		
		for(i = 0; i < slides.length; i++){
			slides[i].style.display = "none";
		}
    
    	slides[FIndex-1].style.display = "block";
	}
}

function Skills2(){
	if(AIO2 == true){
		a2.hp = a.hp + " <span style='color: rgb(255, 230, 0)'>(+ " + (0).toFixed(2) + ")</span>";
		a2.mp = a.mp + " <span style='color: rgb(255, 230, 0)'>(+ " + (0).toFixed(2) + ")</span>";
		a2.armor = a.armor + " <span style='color: rgb(255, 230, 0)'>(+ " + (0).toFixed(2) + ")</span>";
		a2.splblock = a.splblock + " <span style='color: rgb(255, 230, 0)'>(+ " + (0).toFixed(2) + ")</span>";
		a2.hpreg = a.hpreg + " <span style='color: rgb(255, 230, 0)'>(+ " + (0).toFixed(2) + ")</span>";
		a2.mpreg = a.mpreg + " <span style='color: rgb(255, 230, 0)'>(+ " + (0).toFixed(2) + ")</span>";
		a2.atkdmg = a.atkdmg + " <span style='color: rgb(255, 230, 0)'>(+ " + (0).toFixed(2) + ")</span>";
		a2.atkspd = a.atkspd + " <span style='color: rgb(255, 230, 0)'>(+ " + (0).toFixed(2) + ")</span>";
	}
	
	document.getElementById("skills").innerHTML = 
	`
		<table width='100%'>
			<tr>
				<td> HP: ${a2.hp}</td>
			</tr>

			<tr>
				<td> HP Regen: ${a2.hpreg}</td>
			</tr>

			<tr>
				<td> MP: ${a2.mp}</td>
			</tr>

			<tr>
				<td> MP Regen: ${a2.mpreg}</td>
			</tr>

			<tr>
				<td> Velocidade de Movimento: ${a2.speed}</td>
			</tr>
			
			<tr>
				<td> Velocidade de Ataque: ${a2.atkspd} </td>
			</tr>
			
			<tr>
				<td> Armadura: ${a2.armor}</td>
			</tr>
			
			<tr>
				<td> Resistência Mágica: ${a2.splblock}</td>
			</tr>
			
			<tr>
				<td> Dano de Ataque: ${a2.atkdmg}</td>
			</tr>
			
			<tr>
				<td>À distância: ${a2.atkrng}</td>
			</tr>
		</table>
	`;
}

function Nivel18(e){
	if(e.value > 18) alert("ATENÇÃO: O nível máximo de cada Campeão é 18.");
	
	a2.hp = a.hp + " <span style='color: rgb(255, 230, 0)'>(+ " + ((e.value - 1) * a.hpup).toFixed(2) + ")</span>";
	a2.mp = a.mp + " <span style='color: rgb(255, 230, 0)'>(+ " + ((e.value - 1) * a.mpup).toFixed(2) + ")</span>";
	a2.armor = a.armor + " <span style='color: rgb(255, 230, 0)'>(+ " + ((e.value - 1) * a.armorup).toFixed(2) + ")</span>";
	a2.splblock = a.splblock + " <span style='color: rgb(255, 230, 0)'>(+ " + ((e.value - 1) * a.splblockup).toFixed(2) + ")</span>";
	a2.hpreg = a.hpreg + " <span style='color: rgb(255, 230, 0)'>(+ " + ((e.value - 1) * a.hpregup).toFixed(2) + ")</span>";
	a2.mpreg = a.mpreg + " <span style='color: rgb(255, 230, 0)'>(+ " + ((e.value - 1) * a.mpregup).toFixed(2) + ")</span>";
	a2.atkdmg = a.atkdmg + " <span style='color: rgb(255, 230, 0)'>(+ " + ((e.value - 1) * a.atkdmgup).toFixed(2) + ")</span>";
	a2.atkspd = a.atkspd + " <span style='color: rgb(255, 230, 0)'>(+ " + (((e.value - 1) * a.atkspdup) * 0.001).toFixed(2) + ")</span>";
	
	AIO2 = false;
	Skills2();
}