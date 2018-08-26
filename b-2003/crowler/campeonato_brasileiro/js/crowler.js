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
	h = str.match(/([\d]+h[\d]+)/);
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
	day = str.match(/([a-zA-Z].*)/);
	if( day ) {
		d = day[0];
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

		$tds  =  $( this ).find('td');

		if( $tds.length == 1 && $tds.attr('bgcolor') == '#000080' ) {
			str =  $tds.text();
			if( checkRodada( str ) ) {
				rodada = getRodada( str );
			}
			//rodada = $tds.text();
			//isRodada = true;
		}else if( $tds.length == 1 && $tds.attr('bgcolor') == '#dbeadb' && checkDate( $tds.text() ) ) {
			diaRodada   =  parseDay( $tds.text() );
			dataRodada  =  parseDate( $tds.text() );
			isContinue = true;
		}else if( $tds.length == 1 && checkClube( $tds.text() ) && ( $tds.attr('bgcolor') == '#E1E1D5' || $tds.attr('bgcolor') == '#DBDBDB' ) ) {
			clube1    =  getClube( $tds.text(), "1" );
			clube2    =  getClube( $tds.text(), "2" );
			placar    =  getPlacar( $tds.text().replace(/[^a-z0-9]/gi,'') );
			vencedor  =  getVencedor( placar, clube1, clube2 );
		}else if( checkLocal( $tds.text() ) ) {

			//Corrige bug de não pegar o jogo porque ñão tem o horário
			if( checkHorario( $tds.text() ) ) {
				horario  =  getHorario( $tds.text() );
			}else {
				horario  =  '';
			}

			arena    =  getLocal( $tds.text() );
			$table.append($('<tr></tr>'))
				$table.find('tr:last').append( '<td>'+horario+'</td>' ).append( '<td>'+diaRodada+'</td>' )
				                      .append( '<td>'+dataRodada+'</td>' ).append( '<td>'+clube1+'</td>' )
				                      .append( '<td>'+clube2+'</td>' ).append( '<td>'+placar+'</td>' )
				                      .append( '<td>'+vencedor+'</td>' ).append( '<td>'+rodada+'</td>' ).append( '<td>'+arena+'</td>' );		   
		}else if( $tds.length == 1 && $tds.attr('colspan') == 5 && $tds.attr('bgcolor') == '#008000' ) {
			str =  $tds.text();
			if( checkRodada( str ) ) {
				rodada = getRodada( str );
			}
		}else if( $tds.length == 1 && $tds.attr('colspan') == 5 && $tds.attr('bgcolor') == '#DBEADB' ) {
			diaRodada   =  parseDay( $tds.text() );
			dataRodada  =  parseDate( $tds.text() );
			//console.log( true );
		}else if( $tds.length == 5 && checkHorario( $tds.eq(0).text() ) ) {

			//if( rodada == '44ª                       Rodada') {
				//console.log("RODADAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
			//}else {
				//console.log(rodada);
			//}

			$table.append($('<tr></tr>'))
			horario     =  $tds.eq(0).text();
			horario     =  horario.length < 5 ? horario+'00': horario;
			clube1      =  $tds.eq(1).text();
			clube2      =  $tds.eq(3).text();
			placar      =  $tds.eq(2).text();
			vencedor    =  getVencedor( placar, clube1, clube2 );
			arena       =  $tds.eq(4).text();
			$table.find('tr:last').append( '<td>'+horario+'</td>' ).append( '<td>'+diaRodada+'</td>' )
			                      .append( '<td>'+dataRodada+'</td>' ).append( '<td>'+clube1+'</td>' )
			                      .append( '<td>'+clube2+'</td>' ).append( '<td>'+placar.replace(/[^a-z0-9]/gi,'')+'</td>' )
			                      .append( '<td>'+vencedor+'</td>' ).append( '<td>'+rodada+'</td>' ).append( '<td>'+arena+'</td>' );			
		}else if( $tds.text().replace(/ /g, '') == 'OJOGODOTÍTULO' ) {
			//console.log("SIMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM");
			//if( isRodada && isContinue ) {
				//console.log( isRodada );
//			}
		}else {
			//console.log($tds.text() )
			//if( isRodada && isContinue ) {
				//console.log( isRodada );
			//}
		}

		/*
		//Verifica se é uma rodada
		if( $( this ).attr('colspan') == 5 && $( this ).attr('bgcolor') == '#008000' ) {
			isRodada    =  true;
			isContinue  =  false;
			horario     =  '';
			clube1      =  '';
			clube2      =  '';
			placar      =  '';
			vencedor    =  '';
			arena       =  '';
			$table.append($('<tr></tr>'))
		}else if( isRodada == true ) {			
			diaRodada   =  parseDay( $( this ).text() );
			dataRodada  =  parseDate( $( this ).text() );
			isRodada    =  false;
			isContinue  =  true;
		}else if( isContinue ) {
			console.log( $( this ).text() );
			horario     =  $( this ).eq(1).find('font').text();
			clube1      =  '';
			clube2      =  '';
			placar      =  '';
			vencedor    =  '';
			arena       =  '';
			$table.find('tr:last').append( '<td>'+horario+'</td>' ).append( '<td>'+clube1+'</td>' )
			                      .append( '<td>'+clube2+'</td>' ).append( '<td>'+placar+'</td>' )
			                      .append( '<td>'+vencedor+'</td>' ).append( '<td>'+arena+'</td>' )
			                      .append( '<td>'+diaRodada+'</td>' ).append( '<td>'+dataRodada+'</td>' );
			                      //console.log( (i++) );
		}
		*/
		
	});
}

function getFirstTable( $html ) {
	var $table  =  $( '.content' ).find( 'table' ).eq(0);//$( '.content' ).find( 'table' ).eq(20);
	//$( '.content' ).html( $table );
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
	       //console.log(jqXHR);

	    }
	});
}