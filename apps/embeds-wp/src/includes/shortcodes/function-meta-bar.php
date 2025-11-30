<?php

/**
 * Fires when file is loaded to add shortcode.
 */
GW2Emb_Shortcodes::add('metaBar');

/**
 * Called by WordPress, if shortcode is used.
 *
 * @param array  $atts
 * @param string $content
 * @param string $tag
 *
 * @return string
 */
function gw2emb_mapLoader_handler($atts = [], $content, $tag = 'error')
{
    $filter = [
        'ids' => '',
        'timer' => '',
    ];

    require_once GW2Embeds::$path.'includes/shortcodes/GW2Emb_HtmlBuilder.php';

    // open new shortcode-instance.
    $shortcode = new GW2Emb_HtmlBuilder($atts, $tag, $filter);

    // cache the automatically created embedding code.
    $embedding = $shortcode->get_embedding();

    // check if armory-embed scripts are added.
    GW2Emb_Shortcodes::check_scripts();

    // hand over the embedding back to WordPress.
    return $embedding;
}
