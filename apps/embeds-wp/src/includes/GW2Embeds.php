<?php

/**
 * Main Plugin Bootstrap.
 *
 * Load available shortcodes.
 * define hooks.
 */

/** Main Plugin class */
class GW2Embeds
{
    /**
     * Plugin Path.
     *
     * @var string
     */
    public static $path;

    /**
     * Plugin URL.
     *
     * @var string
     */
    public static $url;

    /**
     * Constructor.
     *
     * @param string $plugin_file path string
     */
    public function __construct($plugin_file)
    {
        self::$path = plugin_dir_path($plugin_file);
        self::$url = plugin_dir_url($plugin_file);

        $this->load_includes();
        $this->define_common_hooks();
    }

    /**
     * Include essential files and load shortcodes.
     */
    private function load_includes()
    {
        // load shortcode management class.
        require_once self::$path.'includes/GW2Emb_Shortcodes.php';

        // load available shortcodes.
        require_once self::$path.'includes/shortcodes/0-include-shortcodes.php';
    }

    /**
     * Register available shortcodes.
     */
    private function define_common_hooks()
    {
        add_action('init', ['GW2Emb_Shortcodes', 'register']);
    }
}
