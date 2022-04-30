
let playerConteiner =  document.getElementById("playerConteiner");

let isEdit = false;

let players=[ {"name":"Hartigan", "win":100, "ko":77, "loose":6, "pts":10071},
              {"name":"Boxing Fanatico", "win":83, "ko":80, "loose":2, "pts":8378},
              {"name":"Aimbot", "win":97, "ko":12, "loose":5, "pts":9707},
              {"name":"Eliza", "win":100, "ko":77, "loose":6, "pts":10071},
              {"name":"Alloc", "win":95, "ko":72, "loose":6, "pts":9566},
              {"name":"AlloBoss", "win":113, "ko":76, "loose":2, "pts":11374},
              {"name":"Die Monsters", "win":50, "ko":23, "loose":1, "pts":5022}];

function chanche(items = false, id = -1){


	if (items)
	{
		items.pts = (items.win + items.ko) - items.loose;		
		if (id > -1)
			players[id] = items;
		else 
			players.push(items);
	}

    players.sort(function (a, b) {
        if (a.pts < b.pts){return 1;}
        if (a.pts > b.pts){return -1;}            
        return 0;
    });

	isEdit = false;

	view();
}

function deleter(id){	
	delete(players[id]);
	view();
}

function view(){

		let viewecord = '';

        function querryElements(element, index) {

            querry = document.getElementById('form-find').value.trim();

            if (element.name.toLowerCase().indexOf(querry)  >= 0)
                viewecord = viewecord + '<li id=' + index + '><p>' + element.name + '</p><p>'
                            + element.win + '</p><p>'
                            + element.ko + '</p><p>'
                            + element.loose + '</p><p>'
                            + element.pts + '</p><p class="ed"></p><p class="de"></p></li>';
        }
      
       players.forEach(querryElements);

       playerConteiner.innerHTML = viewecord;
	   
	   edit();

	 
}



document.getElementById('form-find').addEventListener('keyup', function(){
    view();
});




function edit(){

	items = document.getElementsByClassName('ed');
	for (var i = 0; i < items.length; i++) {
		items[i].addEventListener('click', function (e) {
			let id = e.target.parentNode.getAttribute("id");
			if (!isEdit){
				document.getElementById(id).innerHTML = '<input type="text" name="nickname" class="editor" value="'+ players[id].name +'">'
				+ '<input type="number" name="win" min="0" class="editor" value="'+ players[id].win +'">'
				+ '<input type="number" name="ko" min="0" class="editor" value="'+ players[id].ko +'">'
				+ '<input type="number" name="loose" class="editor" min="0" value="'+ players[id].loose +'"><p>'
				+ players[id].pts + '</p><p class="sa"></p><p class="ca"></p>';
				
				itemsCa = document.getElementsByClassName('ca');
				itemsCa[0].addEventListener('click', function (e) { chanche(); });

				save(id);
			}
		});
	}

	items = document.getElementsByClassName('de');
	for (var i = 0; i < items.length; i++) {
		items[i].addEventListener('click', function (e) {
			if (!isEdit)
			 	deleter(e.target.parentNode.getAttribute("id"));
		});
	}

}


function save(id){
	isEdit = true;

	function setChanche(){
		playeritems = {"name":   document.getElementsByName('nickname')[0].value,
						"win":   document.getElementsByName('win')[0].value,
						"ko":    document.getElementsByName('ko')[0].value,
						"loose": document.getElementsByName('loose')[0].value, 
						"pts":0},
	
		chanche(playeritems, id);

	}

	function handleMouseClick(event) {

		console.log('Вы нажали на элемент 1:', event.target.className);		
		if (event.target.className != 'editor' && event.target.className != 'sa' && event.target.className != 'ed')
		{
			if (isEdit)
				setChanche(); 
	
			console.log('Вы нажали на элемент 2:', event.target.className);

			document.removeEventListener('click', handleMouseClick);
		}						
	}
	
	document.addEventListener('click', handleMouseClick);

	let items = document.getElementById(id).getElementsByClassName('sa');
	items[0].addEventListener('click', function (e) {			
		setChanche();
	});

	items = document.getElementsByClassName('editor');
	for (var i = 0; i < items.length; i++) {
		items[i].addEventListener('keydown', function (e) {
			if (e.keyCode === 13)
				setChanche();
		});
	}


	items = document.getElementsByClassName('ed');
	for (var i = 0; i < items.length; i++)
		items[i].parentNode.classList.add('isedit');
}



chanche();



document.querySelector('.new-record').addEventListener('submit', function(){
	newspls	    = {"name":   document.getElementsByName('f_nickname')[0].value,
	"win":   document.getElementsByName('f_win')[0].value,
	"ko":    document.getElementsByName('f_ko')[0].value,
	"loose": document.getElementsByName('f_loose')[0].value, 
	"pts":0},

	chanche(newspls, -2);

	return false; 

});
