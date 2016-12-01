<?php

namespace App\Console\Commands;

use App\Win;
use App\Winner;
use Illuminate\Console\Command;

class AssignWinners extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'winners:assign';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Assign winners based on this month\'s activity';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        //
        $wins = Win::where('created_at', '>=', '2016-11-01 00:00:00')->where('created_at', '<', '2016-12-01 00:00:00')->doesntHave('winner')->get();
        // $this->info($wins->count());
        // return $wins;
        $wins->each(function ($win) {
            Winner::create([
                'project_id' => $win->project_id,
                'award_id' => $win->award_id,
                'owner_id' => $win->owner_id,
                'win_id' => $win->id,
            ]);
        });
    }
}
