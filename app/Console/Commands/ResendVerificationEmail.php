<?php

namespace App\Console\Commands;

use App\User;
use Illuminate\Console\Command;
use Jrean\UserVerification\Facades\UserVerification;

class ResendVerificationEmail extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'verification:resend {email}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Resend Verification to Email';

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
        $user = User::where('email', $this->argument('email'))->first();
        UserVerification::generate($user);
        UserVerification::send($user, $subject = 'IndieWise: Account Verification', $from = 'noreply@getindiewise.com', $name = 'IndieWise Registration');
        $this->info('Verification Email Sent');
    }
}
