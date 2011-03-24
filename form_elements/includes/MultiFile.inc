<?php

/* @file
 *
 *  Allows forms to dynamically add new tabs to a tabpanel in a form.
 */

/**
 * Theme hook for a tabpanel
 *
 * @param $element the drupal element containing the multifile to be rendered
 */
function theme_multifile($element) {
  $path = drupal_get_path('module', 'islandora_form_builder_elements');
  drupal_add_js($path . '/js/jquery.MultiFile.js');

  $item = theme('form_element', 
                 $element, 
                 '<input type="file" name="' . 
                 $element['#name'] . '[]"' . 
                 ($element['#attributes'] ? ' ' . drupal_attributes($element['#attributes']) : '') . 
                 ' id="' . $element['#id'] . 
                 '" class="multi"' .
                 ($element['#maxnumber'] ? 'maxlength="' . $element['#maxnumber'] . '" ' : '') .
                 ($element['#filetypes'] ? 'accept="' . $element['#filetypes'] . '" ' : '') .
                 'size="' . 
                 $element['#size'] . 
                 "\" />\n");

  return $item;
}

/**
 * Turns a $_FILE array created by multifile into an array of arrays that 
 * the drupal file functions can handle. For some reason the file data is
 * handled differently when we are using the multifile function.
 *
 * @param $file The $_FILE array to be transformed
 * @param $name string The name of the multifile component 
 *
 * @return array An array of arrays each containing a vaild $_FILE for a file
 */
function multifile_array_mangler($file, $name) {

  if( empty($file[$name]['name']) )
    return array();

  $mangled = array();

  $i = 0;
  foreach( $file[$name]['name'] as $key => $filename ) {
    $mangled[$i]['files'] = array();
    $mangled[$i]['files']['name']     = array($name . $key => $file[$name]['name'][$i]);
    $mangled[$i]['files']['type']     = array($name . $key => $file[$name]['type'][$i]);
    $mangled[$i]['files']['tmp_name'] = array($name . $key => $file[$name]['tmp_name'][$i]);
    $mangled[$i]['files']['error']    = array($name . $key => $file[$name]['error'][$i]);
    $mangled[$i]['files']['size']     = array($name . $key => $file[$name]['size'][$i]);
    $i++;
  }

  return $mangled;
}

