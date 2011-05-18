<?php

// $Id$

/**
 * @file
 *
 */
class Hidden {

  /**
   * Creates a number of panels based on how many nodes exist.
   *
   * @param array $form
   * @param DOMNodeList $node_list
   */
  static public function populate(&$form, &$registered_nodes) {
    if (isset($form['content'])) {
      $i = 0;
      foreach ($registered_nodes as &$registered_node) {
        list($hash, $node) = $registered_node;
        $form['content'][$i] = $form['content'][0];
        $form['content'][$i]['#form_builder'] = $form['#form_builder'];
        $form['content'][$i]['#form_builder']['hash'] = $hash;
        $i++;
      }
    }
    else {
      list($hash, $node) = $registered_nodes[0];
      $form['#default_value'] = trim($node->textContent);
      $form['#form_builder']['hash'] = $hash;
    }
  }

  /**
   *
   * @param array $form
   * @param array $form_state 
   */
  public function process(&$form, &$form_state) {
    if (isset($form['#form_builder']) && isset($form['content']) && empty($form['content'][0]['#form_builder'])) {
      $form['content'][0]['#form_builder'] = $form['#form_builder'];
    }
    return $form;
  }

}

function islandora_form_builder_elements_process_hidden(&$form, $edit, &$form_state) {
  $hidden = new Hidden();
  return $hidden->process($form, $form_state);
}