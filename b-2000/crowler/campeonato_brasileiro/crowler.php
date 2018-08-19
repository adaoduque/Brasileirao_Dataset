<?php
	require 'simple_html_dom.php';

	$ano    =  $_POST['ano'];
	$pages  =  array();
	$data   =  array();

	switch ( $ano ) {
		case 2000:
			$pages[0]  =  'http://www.bolanaarea.com/brasileirao_'.$ano.'_tabela_fase1.htm';
			$pages[1]  =  'http://www.bolanaarea.com/brasileirao_'.$ano.'_tabela_fasefinal.htm';
		break;		
		default:
			//
		break;
	}
 	
 	for( $i = 0; $i < count( $pages ); $i++ ) {
 		$html   =  file_get_html( $pages[$i] );
		$data[$i] = str_replace( '"','\'',$html->find('table')[20] );
	}

	echo json_encode( $data );

	exit;