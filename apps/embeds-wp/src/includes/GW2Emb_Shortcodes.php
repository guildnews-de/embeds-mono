<?php

/**
 * Main Shortcodes Management class.
 */

/** Shortcode class */
class GW2Emb_Shortcodes
{
    /**
     * Shortcode prefix.
     *
     * @var string
     */
    public const PREFIX = 'gw2emb_';

    /**
     * HTML dataset prefix.
     *
     * @var string
     */
    public const DATASET = 'data-gw2-';

    /**
     * Static buffer for shortcodes
     * Filled through add-Method during load of individual shortcode files.
     *
     * @var array of sc-tag => sc-tag_handler pairs
     */
    private static $shortcodes = [];

    /**
     * Adds shortcode-tag to array.
     *
     * @param string $tag to be added
     */
    public static function add($tag)
    {
        self::$shortcodes[$tag] = $tag.'_handler';
    }

    /**
     * Register shortcodes in WordPress.
     */
    public static function register()
    {
        foreach (self::$shortcodes as $tag => $callback) {
            add_shortcode(self::PREFIX.$tag, self::PREFIX.$callback);
        }
    }

    /**
     * Check if embed scripts are added.
     */
    public static function check_scripts()
    {
        wp_enqueue_script_module(
            id: 'gw2embeds.js',
            src: GW2Embeds::$url.'public/gw2embeds/index.js',
            version: '2.1',
        );
    }
}
