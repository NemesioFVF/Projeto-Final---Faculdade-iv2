var AIO = false;

fetch("https://ddragon.leagueoflegends.com/cdn/11.3.1/data/pt_BR/item.json").then(requisicao => requisicao.json()).then(link => {
	AIO = link;
	let i = 0;
	
	for(prop in link.data){
		if(i == 0)
        {
			detalhesITS(prop);
			i++;
		}
        
		document.getElementById("N").innerText = "Itens";
    	document.getElementById("Nitens").innerHTML += 
		`
		<div>
			<img src='https://ddragon.leagueoflegends.com/cdn/11.3.1/img/item/${AIO.data[prop].image.full} 
			'title='${AIO.data[prop].name}' 
			id='${prop}' onclick='detalhesITS(this.id)'>
		</div>
		`
    }
});

function detalhesITS(n){
	document.getElementById("titulo").innerText = "Nome do Item: " + AIO.data[n].name;
	document.getElementById("ITSdetalhes").innerHTML = "";
	
	document.getElementById("ITSdetalhes").innerHTML +=  
	`
	<center>
	<img src='https://ddragon.leagueoflegends.com/cdn/11.3.1/img/item/${AIO.data[n].image.full}'>
	</center> 
    Descrição: ${AIO.data[n].description}
	`

	document.getElementById("SUBits").innerText = "";
	document.getElementById("apritens").innerHTML = "";
    document.getElementById("h1").innerHTML = "";
	
	try {
		if (AIO.data[n].into.length > 0) 
        document.getElementById("SUBits").innerText = "Aprimoramentos do Item " + AIO.data[n].name;
	
		for (let i = 0; i < AIO.data[n].into.length; i++){
			document.getElementById("apritens").innerHTML+= 
			`
			<img src='https://ddragon.leagueoflegends.com/cdn/11.3.1/img/item/${AIO.data[n].into[i]}.png' 
			title='${AIO.data[AIO.data[n].into[i]].name}' 
			id='${AIO.data[n].into[i]}' onclick='detalhesITS(this.id)'>
			`
		}
	} 
    
    catch(e){
		console.clear();
	}
}