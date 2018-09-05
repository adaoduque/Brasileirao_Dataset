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
		case 2006:
			$pages[0]['link']   =  'http://www.bolanaarea.com/brasileirao_'.$ano.'_tabela_1_turno.htm';
			$pages[0]['table']  =  0;
			$pages[1]['link']   =  'http://www.bolanaarea.com/brasileirao_'.$ano.'_tabela_2_turno.htm';
			$pages[1]['table']  =  0;
		break;
		case 2007:
			$pages[0]['link']   =  'http://www.bolanaarea.com/brasileirao_'.$ano.'_tb1.htm';
			$pages[0]['table']  =  31;
			$pages[1]['link']   =  'http://www.bolanaarea.com/brasileirao_'.$ano.'_tb2.htm';
			$pages[1]['table']  =  31;
		break;
		case 2008:
			$pages[0]['link']   =  'http://www.bolanaarea.com/brasileirao_'.$ano.'_tb1.htm';
			$pages[0]['table']  =  'table149';
			$pages[1]['link']   =  'http://www.bolanaarea.com/brasileirao_'.$ano.'_tb2.htm';
			$pages[1]['table']  =  'table190';
			$pages[2]['link']   =  'http://www.bolanaarea.com/brasileirao_'.$ano.'_tb3.htm';
			$pages[2]['table']  =  'table218';
			$pages[3]['link']   =  'http://www.bolanaarea.com/brasileirao_'.$ano.'_tb4.htm';
			$pages[3]['table']  =  'table246';
		break;			
		default:
			//
		break;
	}
 	
 	for( $i = 0; $i < count( $pages ); $i++ ) {
 		$tb       =  $pages[$i]['table'];
 		$html     =  file_get_html( $pages[$i]['link'] );
 		$html     =  $html->find('table[id='.$tb.']', 0);
 		//$html     =  $html->find('table')[$tb];

 		$j  = 0;
 		foreach ($html->find('tr') as $e ) {
 			if( $j > 1 ) {
 				break;
 			}else {
 				$e->outertext = '';
 			}

 			$j++;
 		}


		$data[$i] =  str_replace( '"','\'',$html );
		#$data[$i] =  str_replace( '"','\'', file_get_contents( $pages[$i]['link'] ) );
	}

	echo json_encode( $data );

	exit;