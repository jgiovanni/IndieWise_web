<?php

use Illuminate\Database\Seeder;
use IndieWise\Project;

class ProjectTableSeeder extends Seeder {

    public function run()
    {
        DB::table('projects')->truncate();
        $json = File::get("database/data/projects.json");
        $data = json_decode($json);
        foreach ($data as $obj) {
            Project::create(array(
                'id' => $obj->id,
                'awardCount' => $obj->awardCount,
                'commentCount' => $obj->commentCount,
                'critiqueCount' => $obj->critiqueCount,
                'nominationCount' => $obj->nominationCount,
                'rateDownCount' => $obj->rateDownCount,
                'rateUpCount' => $obj->rateUpCount,
                'reactionCount' => $obj->reactionCount,
                'completionDate' => $obj->completionDate,
                'description' => $obj->description,
                'director' => $obj->director,
                'disableComments' => $obj->disableComments,
                'disableCritiques' => $obj->disableCritique,
                'disableProject' => $obj->disableProject,
                'hosting_id' => $obj->hosting_id,
                'hosting_type' => $obj->hosting_type,
                'iwRating' => $obj->iwRating,
                'name' => $obj->name,
                'thumbnail_url' => $obj->thumbnail_url,
                'unlist' => $obj->unlist,
                'url_id' => $obj->url_id,
                'video_url' => $obj->video_url,
                'writer' => $obj->writer,
                'producers' => $obj->producers,
                'runTime' => $obj->runTime,
                'owner_id' => $obj->owner,
                'filmingCountry_id' => $obj->filmingCountry,
                'language_id' => $obj->language,
                'type_id' => $obj->type,
                'keyCast' => $obj->keyCast,
                'tags' => $obj->tags,
                'nsfw' => $obj->nsfw,
                'copyrightOwner' => $obj->copyrightOwner,
            ));
        }
    }

}