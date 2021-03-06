@extends('master')

@section('css')
    <style>
        dd {
            text-indent: 20px;
        }
        .question {
            color: #6684D8;
        }
        .answer {
            color: #6AA880;
        }
    </style>
@endsection

@section('layout')
    <!--breadcrumbs-->
    <section id="breadcrumb" class="md-layout md-size-100 breadMargins">
        <div class="md-layout row md-gutter">
            <div class="md-layout md-size-100" style="align-items: center;">
                <nav aria-label="You are here:" role="navigation">
                    <ul class="breadcrumbs">
                        <li><i class="fa fa-home"></i><a href="/">Home</a></li>
                        <li>
                            <span class="show-for-sr">Current: </span> Frequently Asked Questions
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    </section><!--end breadcrumbs-->

    <section class="category-content row">
        <div class="row">
            <!-- left side content area -->
            <div class="large-8 columns">
                <section class="content content-with-sidebar">
                    <!-- newest video -->
                    <div class="main-heading removeMargin">
                        <div class="row secBg padding-14 removeBorderBottom">
                            <div class="medium-8 small-8 columns">
                                <div class="head-title">
                                    <i class="fa fa-question"></i>
                                    <h4>FAQ</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row secBg">
                        <div class="large-12 columns">
                            <article class="page-content">
                                <dl>
                                    <dt>1. <b class="question">Q:</b> What exactly is IndieWise and how does it work?</dt>
                                    <dd><b class="answer">A:</b> IndieWise is a Virtual Online On-going Festival platform that allows participants
                                        to get objective feedback and win virtual awards based on reviews from other
                                        filmmakers and critics. <br>
                                        See the <a href="https://www.facebook.com/getindiewise/videos/1766076776946197" target="_blank">IndieWise Tutorial</a> to Understand How it Works

                                    </dd>
                                </dl>
                                <dl>
                                    <dt>2. <b class="question">Q:</b>What if I’m currently involved in another Film Festival and restrictions keep me
                                        from having my project public or online?
                                    </dt>
                                </dl>
                                <dl>
                                    <dd><b class="answer">A:</b> We definitely understand and we have a number of options & alternatives for you.
                                        Yes, you may participate with a trailer (however bear in mind with a trailer there
                                        is a limitation on the awards which you may be nominated for)
                                        You may also upload your project and keep it as unlisted until you are ready to make it
                                        public. As unlisted, the project still has a shareable link where you have full power
                                        over who gets to view it (just like Youtube’s “Unlisted” option). Bear in mind that
                                        an Unlisted project is not eligible to win awards, so when you’re ready to list it for
                                        opportunity to win our awards, just make it public!
                                    </dd>
                                </dl>
                                <dl>
                                    <dt>3. <b class="question">Q:</b> Why do I have to upload my own project to IndieWise?</dt>
                                    <dd><b class="answer">A:</b> The reason you upload your own project, is because we, the IndieWise Team would
                                        certainly not take the liberty to upload your project to our website without your
                                        express permission. We understand that perhaps you may not wish for your project to be
                                        online at this time, due to involvement in other festivals/distribution, etc. To
                                        avoid any misunderstandings, we leave it up to you, to upload your project.
                                    </dd>
                                </dl>
                                <dl>
                                    <dt>4. <b class="question">Q:</b> I have signed up and uploaded my project to IndieWise. What now?</dt>
                                    <dd><b class="answer">A:</b> We highly encourage you to share the IndieWise link for your project or trailer
                                        on via Social Media, and encourage people to support and vote for your project.
                                        Also, take the time to critique other projects as well, so that we build a healthy
                                        community together.
                                    </dd>
                                </dl>
                                <dl>
                                    <dt>5. <b class="question">Q:</b> When/Where will the winners be announced?</dt>
                                    <dd><b class="answer">A:</b> Winners will be announced at the end of the month, each month on the IndieWise
                                        Website at this link below, as well as via email and IndieWise Social Media
                                        <br>
                                        <a href="https://getindiewise.com/winners">https://getindiewise.com/winners</a>
                                        <br>
                                        Note: In addition to announcing everyone who has won an IndieWise Virtual Award
                                        during the month (eg. Best Director, Actor, etc.), here are the various categories
                                        where you may compete:
                                        <ul>
                                            <li>Top 3 Trending (Based on Number of Reactions)</li>
                                            <li>Top 3 Highest Rated (Based on IndieWise Average and Number of Critiques)</li>
                                            <li>Top 3 Award-Winning (Based on Number of Award Wins)</li>
                                            <!--<li>Top 3 Most Valuable Critiques</li>-->
                                            <!--<li>Top 3 Most Active Users</li>-->
                                        </ul>
                                    </dd>
                                </dl>
                                <dl>
                                    <dt>6. <b class="question">Q:</b> How may I get more exposure, reactions, and critiques on IndieWise?</dt>
                                    <dd><b class="answer">A:</b> The most common way is to share on social media and request support and feedback
                                        on your project. Like with any festival, the goal is to be loud and confident about
                                        your project and tell everyone about the fine work you are doing! <br>
                                        If you are interested in the Featured Listings on our homepage, kindly email:
                                        <a href="mailto:marketing@getindiewise.com">marketing@getindiewise.com</a></dd>

                                </dl>
                                <dl>
                                    <dt>7. <b class="question">Q:</b> Can I critique my own projects? Or can I create another account and USE THAT to
                                        critique my project :)?
                                    </dt>
                                </dl>
                                <dl>
                                    <dd><b class="answer">A:</b> In both instances the answer is no. We want to provide a space for authentic
                                        feedback and reduce, as much as possible, the amount of bias.
                                    </dd>
                                </dl>
                                <dl>
                                    <dt>8. <b class="question">Q:</b> Can my amazing and incredibly enthusiastic support and fan base create multiple
                                        accounts to nominate my projects and show my projects some love?
                                    </dt>
                                    <dd><b class="answer">A:</b> That too is still a no. All users must have one single account.</dd>

                                </dl>
                                <dl>
                                    <dt>9. <b class="question">Q:</b> Is there an Upload limit? Will there be options for increase upload limits in the
                                        future?
                                    </dt>
                                    <dd><b class="answer">A:</b> At this time we have a 3-Upload-Limit per person. However, we plan to implement
                                        an Additional Uploads feature in the near future, so stay posted for updates and
                                        announcements! And no, you cannot create another account to upload more...you’re
                                        persistent huh? :)
                                    </dd>
                                </dl>
                                <dl>
                                    <dt>10. <b class="question">Q:</b> How do I edit my project details (thumbnail, description, etc.)?</dt>
                                    <dd><b class="answer">A:</b>
                                        <ul>
                                            <li>Go to Your Profile</li>
                                            <li>Click Videos</li>
                                            <li>Click Edit</li>
                                        </ul>
                                    </dd>
                                </dl>
                                <dl>

                                    <dt>11. <b class="question">Q:</b> How do I delete a project?</dt>
                                    <dd><b class="answer">A:</b>
                                        <ul>
                                            <li>Go to Your Profile</li>
                                            <li>Click Videos</li>
                                            <li>Click Delete</li>
                                        </ul>
                                    </dd>
                                </dl>
                                <dl>
                                    <dt>12. <b class="question">Q:</b> Can I privately upload my project, so that only people with whom I share the link,
                                        can see it (just like Youtube’s Unlist option)?
                                    </dt>
                                    <dd><b class="answer">A:</b> Yes, on the Upload Page, choose the “Unlist” option near bottom of form (bear in
                                        mind if you wish to make your project public again, you may do so. Please see Item
                                        #10)
                                    </dd>
                                </dl>
                                <dl>

                                    <dt>13. <b class="question">Q:</b> What if I just want exposure for my project, but don’t wish to receive any
                                        critiques?
                                    </dt>
                                    <dd><b class="answer">A:</b> No problem. On the Upload Page, choose the “Disable Critiques” option near the
                                        bottom of the form
                                    </dd>
                                </dl>
                                <dl>
                                    <dt>14. <b class="question">Q:</b> I’ve uploaded my 3 projects! If I delete one, could I add another in it’s place?
                                    </dt>
                                    <dd><b class="answer">A:</b> Yes Indeed!</dd>
                                </dl>
                                <dl>
                                    <dt>15. <b class="question">Q:</b> Will my film play at the August 2017 Convention in Miami, FL</dt>
                                    <dd><b class="answer">A:</b> Our Internal Jury will go through the IndieWise website periodically and observe
                                        films
                                        which they feel stand out. They will make selections as to which films they feel
                                        should
                                        screen. Announcements will be made in the early part of 2017
                                    </dd>
                                </dl>
                                <dl>
                                    <dt>16. <b class="question">Q:</b> What Inspired IndieWise?</dt>
                                    <dd><b class="answer">A:</b> IndieWise is passionately and proudly of the Indie Filmmaker, by the Indie
                                        Filmmaker, for the Indie Filmmaker. The goal is to empower filmmakers and allow them
                                        to have a voice. As the Founder & President of the #1 Best Reviewed and IMDb
                                        Accredited Widescreen Film & Music Video Festival in Miami, FL, I realized that so
                                        many filmmakers were being rejected from festivals without getting the feedback that
                                        they needed, in order to grow and thrive. Not to mention the many filmmakers who
                                        simply could not afford submission fees, but still had a desire for exposure of
                                        their work. IndieWise is the answer! It is a free product and we allow filmmakers to
                                        get the exposure, empowerment, and feedback. <br>
                                        - Jarrod A Knowles <br>
                                        CEO
                                    </dd>
                                </dl>
                                <dl>
                                    <dt>17. <b class="question">Q:</b> DC or Marvel?</dt>
                                    <dd><b class="answer">A:</b> We’re not touching that one...but one of us here takes it way too seriously and
                                        is standing over my shoulder as I write this…
                                    </dd>
                                </dl>
                            </article>
                        </div>
                    </div>
                </section>
            </div><!-- end left side content area -->

            <!-- sidebar -->
        @include('misc.static-sidebar')

        <!-- end sidebar -->
        </div>
    </section><!-- End Category Content-->

@endsection
