<?php

return [
    'meta' => [
        /*
         * The default configurations to be used by the meta generator.
         */
        'defaults' => [
            'title' => "IndieWise", // set false to total remove
            'description' => 'You be the judge! IndieWise is a platform that encourages constructive dialog and feedback among viewers, critics, and filmmakers.', // set false to total remove
            'separator' => ' - ',
            'keywords' => [],
            'canonical' => false, // Set null for using Url::current(), set false to total remove
        ],

        /*
         * Webmaster tags are always added.
         */
        'webmaster_tags' => [
            'google' => null,
            'bing' => null,
            'alexa' => null,
            'pinterest' => null,
            'yandex' => null,
        ],
    ],
    'opengraph' => [
        /*
         * The default configurations to be used by the opengraph generator.
         */
        'defaults' => [
            'title' => 'IndieWise', // set false to total remove
            'description' => 'You be the judge! What you always wanted, feedback!', // set false to total remove
            'url' => null, // Set null for using Url::current(), set false to total remove
            'type' => false,
            'site_name' => 'IndieWise',
            'locale' => 'en_US',
            'fb:app_id' => '150687055270744',
            'images' => [
                [
                    'url' => 'https://cdn.filepicker.io/api/file/BhrXLYZCQ4YQtCPAB8cf?cache=true',
                    'secure_url' => 'https://cdn.filepicker.io/api/file/BhrXLYZCQ4YQtCPAB8cf?cache=true',
                    'width' => '1170',
                    'height' => '500',

                ],
            ],
        ],
    ],
    'twitter' => [
        /*
         * The default values to be used by the twitter cards generator.
         */
        'defaults' => [
            'card' => 'summary_large_image',
            'site' => '@indiewise',
            'creator' => '@indiewise',
            'title' => 'IndieWise',
            'description' => 'You be the judge! What you always wanted, feedback!',
            'image' => 'https://cdn.filepicker.io/api/file/BhrXLYZCQ4YQtCPAB8cf?cache=true',
        ],
    ],
];
