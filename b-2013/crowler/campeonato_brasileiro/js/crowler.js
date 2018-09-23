function parseDate( str ) {
	date = str.match(/([\d]{1,2})+\/+([\d]{1,2})+\/+([\d]{2,4})/);
	for( i in date) {
		return date[i]
	}
}

function checkDate( str ) {
	var d = false;
	date = str.match(/([\d]{1,2})+\/+([\d]{1,2})+\/+([\d]{2,4})/);
	if( date ) {
		d = true;
	}
	return d;
}

function checkClube( str ) {
	var d = false;
	day = str.match(/([\d]x[\d])/);
	if( day ) {
		d = true;
	}
	return d;
}

function checkHorario( str, cond ) {
	var d = false;
	str   = str.toLowerCase();
	h = str.match(/([\d]+h[\d]+)/);
	if( h ) {
		d = true;
	}else {
		h = str.match(/([\d]+h+)/);
		if( h ) {
			d = true;
		}
	}
	return d;
}

function getHorario( str ) {
	var d = false;
	str   = str.toLowerCase();
	h = str.match(/([\d]+:+[\d]+)/);
	if( h ) {
		d = h[0];
	}
	return d;
}

function checkLocal( str ) {
	var d = false;
	l = str.match(/Local:+\s{1,200}(\w.*).*\(/);
	if( l ) {
		d = true;
	}
	return d;
}

function getLocal( str ) {
	var d = false;
	l = str.match(/:\s+([^(]+)/);
	if( l ) {
		d = l[1];
	}
	return d;
}

function parseDay( str ) {
	var d = '';
	day = str.match(/(.*\W).*-.*[\d]+\/+[0-9]+\/+[0-9]+/);
	if( day ) {
		d = $.trim(day[1].toLowerCase());
		switch(d) {
			case 'dom':
				d = "Domingo";
			break;
			case 'seg':
				d = "Segunda-feira";
			break;
			case 'ter':
				d = "Terça-feira";
			break;
			case 'qua':
				d = "Quarta-feira";
			break;
			case 'qui':
				d = "Quinta-feira";
			break;
			case 'sex':
				d = "Sexta-feira";
			break;
			case 'sab':
				d = "Sábado";
			break;
		}		
	}
	return d;
}

function getPlacar( str ) {
	var p = '';
	var m = '';
	m = str.match(/([\d]x[\d])/);
	if( m ) {
		p = m[0];
	}

	return p;
}

function getClube( str, clube ) {
	var c = '';
	var m = '';
	if( clube == "1" )
		m = str.match(/(.*\W).*[\d]x[\d]/);
	else
		m = str.match(/[\d]x[\d]+(\W.*)/);
	if( m ) {
		c = $.trim( m[1] );
	}

	return c;
}

function getVencedor( str, clube1, clube2 ) {
	placar  =  str.split("x");
	p1      =  parseInt( placar[0] );
	p2      =  parseInt( placar[1] );
	if( p1 > p2 ) {
		return clube1;
	}else if( p2 > p1 ) {
		return clube2;
	}else {
		return '-';
	}
}

function checkRodada( str ) {
	var d = false;
	var m = str.match(/([\d]{1,}ª\s{1,}Rodada)/);
	if( m ) {
		d = true;
	}
	return d;
}

function getRodada( str ) {
	var d = '';
	str   = ucwords( str );
	h     = str.match(/([\d]{1,}ª\s{1,}Rodada)/);
	if( h ) {
		d = h[0];
	}
	return d;
}

function ucwords( str ) {
	str = str.toLowerCase().replace(/\b[a-z]/g, function(letter) {
    	return letter.toUpperCase();
	});
	return str;
}

function getRodadas( $html ) {
	var isRodada    =  false;
	var isContinue  =  false;
	var $table      =  $( '.tbody' );
	var diaRodada   =  '';
	var dataRodada  =  '';
	var rodada      =  '';

	var horario     =  '';
	var clube1      =  '';
	var clube2      =  '';
	var placar      =  '';
	var vencedor    =  '';
	var arena       =  '';
	var i           =   0;

	//Analisa cada TR dos resultados
	$html.find('tr').each( function () {

		var $tds    =  $( this ).find('td');
		var date    =  $tds.text();
		if( checkDate( date ) ) {
			rodada      =  $( this ).attr('data-round')+'ª Rodada';
			diaRodada   =  parseDay( date );
			dataRodada  =  parseDate( date );
			horario     =  getHorario( date );
			arena       =  $tds.find('.game-location').text();
			placar      =  $tds.find('.goalshome').text()+'x'+$tds.find('.goalsvisitor').text()
			clube1      =  $tds.find('.game-club--principal').attr('title');
			clube2      =  $tds.find('.game-club--visitor').attr('title');
			vencedor    =  getVencedor( placar, clube1, clube2 );


			$table.append($('<tr></tr>'))
			$table.find('tr:last').append( '<td>'+horario+'</td>' ).append( '<td>'+diaRodada+'</td>' )
				                  .append( '<td>'+dataRodada+'</td>' ).append( '<td>'+clube1+'</td>' )
				                  .append( '<td>'+clube2+'</td>' ).append( '<td>'+placar+'</td>' )
				                  .append( '<td>'+vencedor+'</td>' ).append( '<td>'+rodada+'</td>' ).append( '<td>'+arena+'</td>' );	
		}
	});
}

function getFirstTable( $html ) {
	var $table  =  $( '.content' ).find( 'table' ).eq(0);//$( '.content' ).find( 'table' ).eq(20);
	$( '.content' ).append( $table );
	return $table;
}

function parseHTML( string ) {
	$( '.content' ).html( string );
}

function getData( ano ) {
	$.ajax({
	    url: "./crowler.php",
	    type: "POST",
	    data: { ano:ano },
	    dataType: 'json',
	    success: function (response) {
	    	try {
		    	//console.log( response );
		    	//alert(response.length);
		    	for(var i = 0; i < response.length; i++) {
			       	parseHTML( response[i] );
			       	$html  =  getFirstTable();
			       	getRodadas( $html );
		    	}
		    }catch( e ) {
		    	alert( "Bug: " + e );
		    }
	    },error: function(jqXHR, textStatus, errorThrown) {
	    	alert("Erro")
	       console.log(jqXHR);
	    }
	});
}