<?php
	require 'simple_html_dom.php';

	$ano    =  $_POST['ano'];
	$pages  =  array();
	$data   =  array();

	switch ( $ano ) {
		case 2000:
			$pages[0]['link']   =  'http://www.bolanaarea.com/brasileirao_'.$ano.'_tabela_fase1.htm';
			$pages[0]['table']  =  20;
			$pages[1]['link']   =  'http://www.bolanaarea.com/brasileirao_'.$ano.'_tabela_fasefinal.htm';
			$pages[1]['table']  =  20;
		break;
		case 2001:
			//BUGADO, PRECISA DE CORREÇÃO
			$pages[0]['link']   =  'http://www.bolanaarea.com/brasileirao_'.$ano.'_tabela_fase1.htm';
			$pages[0]['table']  =  18;
			$pages[1]['link']   =  'http://www.bolanaarea.com/brasileirao_'.$ano.'_tabela_fasefinal.htm';
			$pages[1]['table']  =  20;
		break;
		case 2003:
			$pages[0]['link']   =  'http://www.bolanaarea.com/brasileirao_'.$ano.'_tabela_1_turno.htm';
			$pages[0]['table']  =  20;
			$pages[1]['link']   =  'http://www.bolanaarea.com/brasileirao_'.$ano.'_tabela_2_turno.htm';
			$pages[1]['table']  =  20;
		break;
		case 2004:
			$pages[0]['link']   =  'http://www.bolanaarea.com/brasileirao_'.$ano.'_tabela_1_turno.htm';
			$pages[0]['table']  =  18;
			$pages[1]['link']   =  'http://www.bolanaarea.com/brasileirao_'.$ano.'_tabela_2_turno.htm';
			$pages[1]['table']  =  18;
		break;
		case 2005:
			$pages[0]['link']   =  'http://www.bolanaarea.com/brasileirao_'.$ano.'_tabela_1_turno.htm';
			$pages[0]['table']  =  0;
			$pages[1]['link']   =  'http://www.bolanaarea.com/brasileirao_'.$ano.'_tabela_2_turno.htm';
			$pages[1]['table']  =  0;
		break;
		default:
			//
		break;
	}
 	
 	for( $i = 0; $i < count( $pages ); $i++ ) {
 		$tb       =  $pages[$i]['table'];
 		$html     =  file_get_html( $pages[$i]['link'] );
		$data[$i] =  str_replace( '"','\'',$html->find('table')[$tb] );
		#$data[$i] =  str_replace( '"','\'', file_get_contents( $pages[$i]['link'] ) );
	}

	echo json_encode( $data );

	exit;