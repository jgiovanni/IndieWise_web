@extends('master')

@section('css')
    <style type="text/css"> * {
            margin: 0;
            padding: 0;
            text-indent: 0;
        }

        .s1 {
            color: black;
            font-family: Arial, sans-serif;
            font-style: italic;
            font-weight: normal;
            text-decoration: none;
            font-size: 11pt;
        }

        h2 {
            color: black;
            font-family: Arial, sans-serif;
            font-style: normal;
            font-weight: bold;
            text-decoration: none;
            font-size: 11pt;
        }

        .p, p {
            color: black;
            font-family: Arial, sans-serif;
            font-style: normal;
            font-weight: normal;
            text-decoration: none;
            font-size: 11pt;
            margin: 0pt;
        }

        .s2 {
            color: #333;
            font-family: Arial, sans-serif;
            font-style: normal;
            font-weight: normal;
            text-decoration: none;
            font-size: 11.5pt;
        }

        a {
            color: #0462C1;
            font-family: Arial, sans-serif;
            font-style: normal;
            font-weight: normal;
            text-decoration: underline;
            font-size: 11pt;
        }

        h1 {
            color: #333;
            font-family: Arial, sans-serif;
            font-style: normal;
            font-weight: bold;
            text-decoration: none;
            font-size: 11.5pt;
        }

        .s3 {
            color: #333;
            font-family: Arial, sans-serif;
            font-style: normal;
            font-weight: normal;
            text-decoration: none;
            font-size: 11pt;
        }

        .s5 {
            color: black;
            font-family: Arial, sans-serif;
            font-style: normal;
            font-weight: bold;
            text-decoration: none;
            font-size: 11pt;
        }

        .s6 {
            color: black;
            font-family: Arial, sans-serif;
            font-style: normal;
            font-weight: normal;
            text-decoration: none;
            font-size: 11pt;
        }

        .s8 {
            color: black;
            font-family: Arial, sans-serif;
            font-style: italic;
            font-weight: normal;
            text-decoration: none;
            font-size: 11pt;
        }

        .s9 {
            color: #006FC0;
            font-family: Arial, sans-serif;
            font-style: normal;
            font-weight: bold;
            text-decoration: none;
            font-size: 11pt;
        }

        .s10 {
            color: black;
            font-family: Arial, sans-serif;
            font-style: italic;
            font-weight: normal;
            text-decoration: none;
            font-size: 10pt;
        }

        .s11 {
            color: black;
            font-family: Arial, sans-serif;
            font-style: normal;
            font-weight: bold;
            text-decoration: none;
            font-size: 10pt;
        }

        .s12 {
            color: #006FC0;
            font-family: Arial, sans-serif;
            font-style: normal;
            font-weight: bold;
            text-decoration: none;
            font-size: 10pt;
        }

        li {
            display: block;
        }

        #l1 {
            padding-left: 0pt;
        }

        #l1 > li:before {
            content: " ";
            color: black;
            font-family: Wingdings;
            font-style: normal;
            font-weight: normal;
            text-decoration: none;
            font-size: 11pt;
        }

        li {
            display: block;
        }

        #l2 {
            padding-left: 0pt;
        }

        #l2 > li:before {
            content: " ";
            color: black;
            font-family: Wingdings;
            font-style: normal;
            font-weight: normal;
            text-decoration: none;
        }

        #l3 {
            padding-left: 0pt;
            counter-reset: e1 0;
        }

        #l3 > li:before {
            counter-increment: e1;
            content: counter(e1, decimal) ". ";
            color: #333;
            font-family: Arial, sans-serif;
            font-style: normal;
            font-weight: normal;
            text-decoration: none;
            font-size: 11pt;
        }

        #l4 {
            padding-left: 0pt;
            counter-reset: f1 0;
        }

        #l4 > li:before {
            counter-increment: f1;
            content: counter(f1, decimal) ". ";
            color: black;
            font-family: Arial, sans-serif;
            font-style: normal;
            font-weight: normal;
            text-decoration: none;
            font-size: 11pt;
        }

        #l5 {
            padding-left: 0pt;
        }

        #l5 > li:before {
            content: " ";
            color: black;
            font-family: Wingdings;
            font-style: normal;
            font-weight: normal;
            text-decoration: none;
            font-size: 11pt;
        }

        #l6 {
            padding-left: 0pt;
            counter-reset: g1 0;
        }

        #l6 > li:before {
            counter-increment: g1;
            content: counter(g1, decimal) ". ";
            color: black;
            font-family: Arial, sans-serif;
            font-style: normal;
            font-weight: normal;
            text-decoration: none;
            font-size: 11pt;
        }

        #l7 {
            padding-left: 0pt;
            counter-reset: h1 4;
        }

        #l7 > li:before {
            counter-increment: h1;
            content: counter(h1, decimal) ". ";
            color: black;
            font-family: Arial, sans-serif;
            font-style: normal;
            font-weight: bold;
            text-decoration: none;
            font-size: 11pt;
        }

        #l8 {
            padding-left: 0pt;
            counter-reset: h2 0;
        }

        #l8 > li:before {
            counter-increment: h2;
            content: counter(h2, lower-latin) ". ";
            color: black;
            font-family: Arial, sans-serif;
            font-style: normal;
            font-weight: bold;
            text-decoration: none;
            font-size: 11pt;
        }

        #l9 {
            padding-left: 0pt;
            counter-reset: i1 5;
        }

        #l9 > li:before {
            counter-increment: i1;
            content: counter(i1, decimal) ". ";
            color: black;
            font-family: Arial, sans-serif;
            font-style: normal;
            font-weight: normal;
            text-decoration: none;
            font-size: 11pt;
        }

        #l10 {
            padding-left: 0pt;
            counter-reset: j1 0;
        }

        #l10 > li:before {
            counter-increment: j1;
            content: counter(j1, decimal) ". ";
            color: black;
            font-family: Arial, sans-serif;
            font-style: normal;
            font-weight: normal;
            text-decoration: none;
            font-size: 11pt;
        }

        #l11 {
            padding-left: 0pt;
            counter-reset: k1 0;
        }

        #l11 > li:before {
            counter-increment: k1;
            content: counter(k1, decimal) ". ";
            color: black;
            font-family: Arial, sans-serif;
            font-style: normal;
            font-weight: normal;
            text-decoration: none;
            font-size: 11pt;
        }

        #l12 {
            padding-left: 0pt;
            counter-reset: l1 0;
        }

        #l12 > li:before {
            counter-increment: l1;
            content: counter(l1, decimal) ". ";
            color: black;
            font-family: Arial, sans-serif;
            font-style: normal;
            font-weight: normal;
            text-decoration: none;
            font-size: 11pt;
        }

        #l13 {
            padding-left: 0pt;
            counter-reset: m1 0;
        }

        #l13 > li:before {
            counter-increment: m1;
            content: counter(m1, decimal) ". ";
            color: black;
            font-family: Arial, sans-serif;
            font-style: normal;
            font-weight: normal;
            text-decoration: none;
            font-size: 11pt;
        }

        #l14 {
            padding-left: 0pt;
            counter-reset: n1 0;
        }

        #l14 > li:before {
            counter-increment: n1;
            content: counter(n1, decimal) ". ";
            color: black;
            font-family: Arial, sans-serif;
            font-style: normal;
            font-weight: normal;
            text-decoration: none;
            font-size: 11pt;
        }

        #l15 {
            padding-left: 0pt;
            counter-reset: o1 0;
        }

        #l15 > li:before {
            counter-increment: o1;
            content: counter(o1, decimal) ". ";
            color: black;
            font-family: Arial, sans-serif;
            font-style: normal;
            font-weight: normal;
            text-decoration: none;
            font-size: 11pt;
        }

        #l16 {
            padding-left: 0pt;
            counter-reset: p1 0;
        }

        #l16 > li:before {
            counter-increment: p1;
            content: counter(p1, decimal) ". ";
            color: black;
            font-family: Arial, sans-serif;
            font-style: normal;
            font-weight: normal;
            text-decoration: none;
            font-size: 11pt;
        }

        #l17 {
            padding-left: 0pt;
            counter-reset: q1 0;
        }

        #l17 > li:before {
            counter-increment: q1;
            content: counter(q1, decimal) ". ";
            color: black;
            font-family: Arial, sans-serif;
            font-style: normal;
            font-weight: normal;
            text-decoration: none;
            font-size: 11pt;
        }

        #l18 {
            padding-left: 0pt;
        }

        #l18 > li:before {
            content: " ";
            color: black;
            font-family: Wingdings;
            font-style: normal;
            font-weight: normal;
            text-decoration: none;
            font-size: 11pt;
        }

        #l19 {
            padding-left: 0pt;
            counter-reset: q1 1;
        }

        #l19 > li:before {
            counter-increment: q1;
            content: counter(q1, decimal) ". ";
            color: black;
            font-family: Arial, sans-serif;
            font-style: normal;
            font-weight: normal;
            text-decoration: none;
            font-size: 11pt;
        }

        #l20 {
            padding-left: 0pt;
            counter-reset: q2 0;
        }

        #l20 > li:before {
            counter-increment: q2;
            content: counter(q2, decimal) ". ";
            color: black;
            font-family: Arial, sans-serif;
            font-style: normal;
            font-weight: normal;
            text-decoration: none;
            font-size: 11pt;
        }

        article.page-content ol {
            margin-bottom: 15px;
            margin-left: 10px;
        }

        article.page-content p {
            font-size: 13px;
            margin-bottom: 0px;
        }

        article.page-content p:last-of-type {
            margin-bottom: 5px;
        }
    </style>
@endsection

@section('layout')
    <!--breadcrumbs-->
    <section id="breadcrumb" class="md-layout md-flex-100 breadMargin">
        <div class="md-layout row md-gutter">
            <div class="md-layout md-flex-100" style="align-items: center;">
                <nav aria-label="You are here:" role="navigation">
                    <ul class="breadcrumbs">
                        <li><i class="fa fa-home"></i><a href="/">Home</a></li>
                        <li>
                            <span class="show-for-sr">Current: </span> Terms of Service
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    </section><!--end breadcrumbs-->

    <section class="category-content row">
        <div class="row">
            <!-- left side content area -->
            <div class="large-12 columns">
                <section class="content">
                    <!-- newest video -->
                    <div class="main-heading removeMargin">
                        <div class="row secBg padding-14 removeBorderBottom">
                            <div class="medium-8 small-8 columns">
                                <div class="head-title">
                                    <i class="fa fa-user"></i>
                                    <h4>Terms and Conditions</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row secBg">
                        <div class="large-12 columns">
                            <article class="page-content">
                                <p style="text-indent: 0pt;text-align: left;"><br/></p>
                                <p class="s1" style="padding-top: 3pt;text-indent: 0pt;text-align: center;">“You Be the
                                    Judge”</p>
                                <p style="text-indent: 0pt;text-align: left;"><br/></p>
                                <p style="padding-left: 17pt;text-indent: 0pt;line-height: 1pt;text-align: center;">
                                    <span><img width="87" height="45" alt="image"
                                               src="https://indiewise.dev/assets/img/Logo_alt2_web_87x45.png"/></span>
                                </p>
                                <p style="text-indent: 0pt;text-align: left;"><br/></p>
                                <h2 style="padding-top: 7pt;text-indent: 0pt;text-align: center;">TERMS AND
                                    CONDITIONS</h2>
                                <p style="text-indent: 0pt;text-align: left;"><br/></p>
                                <p style="padding-left: 5pt;text-indent: 0pt;text-align: justify;">The following is an
                                    explanation of the Terms and Conditions governing the general participation, as well
                                    as the submission of (<span class="s2">including but not limited to) </span>a
                                    feature or short film, trailer, documentary, music video, web series, reality show
                                    pilot, demo reel, feature or short animation, sizzle reel, screenplay, <span
                                            class="s2">musical works, images, clips, and stills </span>(hereafter called
                                    the “Project(s)”) to IndieWise, (hereafter called the “Festival”) for participation
                                    as either a consumer of independent film projects, a critic, enthusiast, advertiser,
                                    sponsor, or filmmaker/artist seeking feedback on their content. All information
                                    contained in this agreement shall herein supersede any prior information regarding
                                    participation in the “Festival”.</p>
                                <p style="text-indent: 0pt;text-align: left;"><br/></p>
                                <ul id="l1">
                                    <li style="padding-left: 41pt;text-indent: -18pt;text-align: left;"><h2
                                                style="display: inline;">ABOUT INDIEWISE</h2>
                                        <p style="padding-top: 9pt;padding-left: 41pt;text-indent: -18pt;text-align: justify;">
                                            1. The purpose of IndieWise is to allow for an open platform of Independent
                                            Filmmakers, Artists, and Art Lovers, who seek Objective Feedback on their
                                            work from peers, and wish to also participate in providing feedback and
                                            judging other projects or works.</p>
                                        <p style="text-indent: 0pt;text-align: left;"><br/></p>
                                        <p style="padding-left: 5pt;text-indent: 0pt;line-height: 108%;text-align: left;">
                                            You agree to be bound and abide by this Agreement if you (A) Sign up or use
                                            IndieWise as a customer; <b>or </b>(B) pay for any IndieWise product or
                                            service, <b>or </b>(C) otherwise use any of the IndieWise Web/Mobile
                                            Applications for any reason. Your use of IndieWise is contingent upon your
                                            agreement to these terms set forth below. If you do not agree to these
                                            terms, you cannot use IndieWise.</p>
                                        <p style="text-indent: 0pt;text-align: left;"><br/></p></li>
                                    <li style="padding-left: 41pt;text-indent: -18pt;text-align: left;"><h2
                                                style="display: inline;">TERM</h2></li>
                                </ul>
                                <p style="text-indent: 0pt;text-align: left;"><br/></p>
                                <p style="padding-left: 41pt;text-indent: -18pt;line-height: 108%;text-align: left;">1.
                                    User is bound to these IndieWise Terms and Conditions from the moment he/she
                                    registers, up to 48 Calendar months after any manner of termination of use,
                                    including but not limited to: voluntary cease of usage, permanent ban.</p>
                                <p style="text-indent: 0pt;text-align: left;"><br/></p>
                                <p style="padding-top: 8pt;padding-left: 5pt;text-indent: 0pt;text-align: justify;"><a
                                            href="https://getindiewise.com/terms-of-service"
                                            style=" color: black; font-family:Arial, sans-serif; font-style: normal; font-weight: normal; text-decoration: none; font-size: 11pt;"
                                            target="_blank">By agreeing to the Terms and Conditions found on the
                                        “Festival” Website, located at </a><span
                                            style=" color: #0462C1; font-family:Arial, sans-serif; font-style: normal; font-weight: normal; text-decoration: underline; font-size: 11pt;">https://getindiewise.com/terms-of-service </span>the
                                    person submitting the Project and all content therein (hereafter called the “User”)
                                    acknowledges that he or she owns the rights to the Project, or has obtained consent
                                    from any and all owners, creators, writers, Producers and/or other authorized
                                    representatives of the Project whose consent is required to submit the Project to
                                    the Festival, and has read, understood, and agreed to all the Terms and Conditions
                                    set forth below:</p>
                                <p style="text-indent: 0pt;text-align: left;"><br/></p>
                                <ul id="l2">
                                    <li style="padding-top: 3pt;padding-left: 23pt;text-indent: -18pt;text-align: left;">
                                        <h1 style="display: inline;">GENERAL RULES</h1>
                                        <p style="text-indent: 0pt;text-align: left;"><br/></p>
                                        <ol id="l3">
                                            <li style="padding-left: 23pt;text-indent: -18pt;text-align: justify;"><p
                                                        class="s3" style="display: inline;">You are the creator and
                                                    legal owner of the Project, or have secured all necessary rights to
                                                    submit the Project.</p>
                                                <p style="text-indent: 0pt;text-align: left;"><br/></p></li>
                                            <li style="padding-left: 23pt;text-indent: -18pt;text-align: justify;"><p
                                                        class="s3" style="display: inline;">There are no disputes
                                                    regarding ownership of the Project, and IndieWise’s use of the
                                                    Project will not cause injury to, violate, or infringe upon the
                                                    rights of any other person or entity.</p>
                                                <p style="text-indent: 0pt;text-align: left;"><br/></p></li>
                                            <li style="padding-left: 23pt;text-indent: -18pt;text-align: justify;"><p
                                                        class="s3" style="display: inline;">You grant IndieWise a
                                                    non-exclusive, royalty-free license to feature and display the
                                                    Project.</p>
                                                <p style="text-indent: 0pt;text-align: left;"><br/></p></li>
                                            <li style="padding-left: 23pt;text-indent: -18pt;text-align: justify;"><p
                                                        class="s3" style="display: inline;">You are eighteen (18) years
                                                    or older, an emancipated minor, or have obtained the authorization
                                                    to enter IndieWise from a parent or legal guardian.</p>
                                                <p style="text-indent: 0pt;text-align: left;"><br/></p></li>
                                            <li style="padding-left: 23pt;text-indent: -18pt;text-align: justify;"><p
                                                        class="s3" style="display: inline;">You acknowledge and
                                                    understand the inherent risks involved in submitting, screening, and
                                                    publishing the Project through an online platform.</p>
                                                <p style="text-indent: 0pt;text-align: left;"><br/></p></li>
                                            <li style="padding-left: 23pt;text-indent: -18pt;text-align: justify;"><p
                                                        class="s3" style="display: inline;">You assume sole and full
                                                    responsibility for the Project, and agree to hold IndieWise harmless
                                                    from and defend IndieWise against any and all claims, demands,
                                                    losses and damages, judgments, liabilities, and expenses (including,
                                                    but not limited to, attorney&#39;s fees) arising out of or in
                                                    connection with any and all claims related to any Project submitted
                                                    to IndieWise.</p>
                                                <p style="text-indent: 0pt;text-align: left;"><br/></p></li>
                                            <li style="padding-left: 23pt;text-indent: -18pt;text-align: justify;"><p
                                                        class="s3" style="display: inline;">IndieWise does not acquire
                                                    any right or ownership in your Intellectual Property as a result of
                                                    your participation in IndieWise.</p></li>
                                        </ol>
                                        <p style="text-indent: 0pt;text-align: left;"><br/></p></li>
                                    <li style="padding-left: 23pt;text-indent: -18pt;text-align: left;"><h2
                                                style="display: inline;">AMENDMENTS AND MODIFICATIONS</h2>
                                        <p style="text-indent: 0pt;text-align: left;"><br/></p>
                                        <p style="padding-left: 23pt;text-indent: -18pt;line-height: 108%;text-align: left;">
                                            1. While IndieWise will make attempts to alert or notify all users of major
                                            modifications, IndieWise may modify this Agreement from time to time with or
                                            without prior notice, and any changes to the Agreement are immediately
                                            effective upon posting the Agreement to the IndieWise Website. You agree,
                                            and it is your responsibility, to review this Agreement regularly to ensure
                                            you are aware of any changes.</p>
                                        <p style="text-indent: 0pt;text-align: left;"><br/></p></li>
                                    <li style="padding-top: 7pt;padding-left: 23pt;text-indent: -18pt;text-align: left;">
                                        <h2 style="display: inline;">UPLOADING:</h2>
                                        <p style="text-indent: 0pt;text-align: left;"><br/></p>
                                        <ol id="l4">
                                            <li style="padding-left: 23pt;text-indent: -18pt;text-align: justify;"><p
                                                        style="display: inline;">There is <u>a maximum upload limit of 3
                                                        Projects </u>per User. Furthermore, the <u>maximum file size per
                                                        upload is 2.75GB</u>. However, for a small monthly fee, a user
                                                    can achieve additional Uploads. See detailed fees outlined in, <b>Table
                                                        1.1 on Page 3</b>, of these Terms and Conditions.</p>
                                                <p style="text-indent: 0pt;text-align: left;"><br/></p>
                                                <ul id="l5">
                                                    <li style="padding-top: 3pt;padding-left: 41pt;text-indent: -18pt;text-align: left;">
                                                        <h2 style="display: inline;">SERVICE FEES:</h2>
                                                        <p style="text-indent: 0pt;text-align: left;"><br/></p>
                                                        <table style="border-collapse:collapse;margin-left:5.024pt"
                                                               cellspacing="0">
                                                            <tr style="height:14pt">
                                                                <td style="width:171pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt"
                                                                    bgcolor="#F7C9AC"><p class="s5"
                                                                                         style="padding-left: 32pt;text-indent: 0pt;line-height: 12pt;text-align: left;">
                                                                        SERVICE / BENEFIT</p></td>
                                                                <td style="width:141pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt"
                                                                    bgcolor="#F7C9AC"><p class="s5"
                                                                                         style="padding-left: 58pt;padding-right: 58pt;text-indent: 0pt;line-height: 12pt;text-align: center;">
                                                                        FEE</p></td>
                                                                <td style="width:156pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt"
                                                                    bgcolor="#F7C9AC"><p class="s5"
                                                                                         style="padding-left: 65pt;padding-right: 65pt;text-indent: 0pt;line-height: 12pt;text-align: center;">
                                                                        PER</p></td>
                                                            </tr>
                                                            <tr style="height:27pt">
                                                                <td style="width:171pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                                                                    <p class="s5"
                                                                       style="padding-top: 6pt;padding-left: 5pt;text-indent: 0pt;text-align: left;">
                                                                        Featured Listing</p></td>
                                                                <td style="width:141pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                                                                    <p class="s6"
                                                                       style="padding-top: 6pt;padding-left: 5pt;text-indent: 0pt;text-align: left;">
                                                                        $149.99</p></td>
                                                                <td style="width:156pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                                                                    <p class="s6"
                                                                       style="padding-top: 6pt;padding-left: 5pt;text-indent: 0pt;text-align: left;">
                                                                        Week</p></td>
                                                            </tr>
                                                            <tr style="height:27pt">
                                                                <td style="width:171pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                                                                    <p class="s5"
                                                                       style="padding-top: 6pt;padding-left: 5pt;text-indent: 0pt;text-align: left;">
                                                                        Up to 5 Uploads</p></td>
                                                                <td style="width:141pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                                                                    <p class="s6"
                                                                       style="padding-top: 6pt;padding-left: 5pt;text-indent: 0pt;text-align: left;">
                                                                        $2.99</p></td>
                                                                <td style="width:156pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                                                                    <p class="s6"
                                                                       style="padding-top: 6pt;padding-left: 5pt;text-indent: 0pt;text-align: left;">
                                                                        Month</p></td>
                                                            </tr>
                                                            <tr style="height:27pt">
                                                                <td style="width:171pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                                                                    <p class="s5"
                                                                       style="padding-top: 6pt;padding-left: 5pt;text-indent: 0pt;text-align: left;">
                                                                        Up to 10 Uploads</p></td>
                                                                <td style="width:141pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                                                                    <p class="s6"
                                                                       style="padding-top: 6pt;padding-left: 5pt;text-indent: 0pt;text-align: left;">
                                                                        $4.99</p></td>
                                                                <td style="width:156pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                                                                    <p class="s6"
                                                                       style="padding-top: 6pt;padding-left: 5pt;text-indent: 0pt;text-align: left;">
                                                                        Month</p></td>
                                                            </tr>
                                                            <tr style="height:27pt">
                                                                <td style="width:171pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                                                                    <p class="s5"
                                                                       style="padding-top: 6pt;padding-left: 5pt;text-indent: 0pt;text-align: left;">
                                                                        Professional Progress Report</p></td>
                                                                <td style="width:141pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                                                                    <p class="s6"
                                                                       style="padding-top: 6pt;padding-left: 5pt;text-indent: 0pt;text-align: left;">
                                                                        $14.99</p></td>
                                                                <td style="width:156pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                                                                    <p class="s6"
                                                                       style="padding-top: 6pt;padding-left: 5pt;text-indent: 0pt;text-align: left;">
                                                                        Report</p></td>
                                                            </tr>
                                                            <tr style="height:27pt">
                                                                <td style="width:171pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                                                                    <p class="s5"
                                                                       style="padding-top: 6pt;padding-left: 5pt;text-indent: 0pt;text-align: left;">
                                                                        Sponsor Listing</p></td>
                                                                <td style="width:141pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                                                                    <p class="s6"
                                                                       style="padding-top: 6pt;padding-left: 5pt;text-indent: 0pt;text-align: left;">
                                                                        $249.99</p></td>
                                                                <td style="width:156pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                                                                    <p class="s6"
                                                                       style="padding-top: 6pt;padding-left: 5pt;text-indent: 0pt;text-align: left;">
                                                                        Month</p></td>
                                                            </tr>
                                                            <tr style="height:27pt">
                                                                <td style="width:171pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                                                                    <p class="s5"
                                                                       style="padding-left: 5pt;padding-right: 26pt;text-indent: 0pt;text-align: left;">
                                                                        Crowdfunding / Donations <span
                                                                                style=" color: #00AF50;">(Coming Soon)</span>
                                                                    </p></td>
                                                                <td style="width:141pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                                                                    <p class="s6"
                                                                       style="padding-top: 6pt;padding-left: 5pt;text-indent: 0pt;text-align: left;">
                                                                        3% - %4</p></td>
                                                                <td style="width:156pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                                                                    <p class="s6"
                                                                       style="padding-top: 6pt;padding-left: 5pt;text-indent: 0pt;text-align: left;">
                                                                        Total Raised</p></td>
                                                            </tr>
                                                            <tr style="height:27pt">
                                                                <td style="width:171pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                                                                    <p class="s5"
                                                                       style="padding-top: 6pt;padding-left: 5pt;text-indent: 0pt;text-align: left;">
                                                                        Bi-Weekly Newsletter</p></td>
                                                                <td style="width:141pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                                                                    <p class="s6"
                                                                       style="padding-top: 6pt;padding-left: 5pt;text-indent: 0pt;text-align: left;">
                                                                        $99</p></td>
                                                                <td style="width:156pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                                                                    <p class="s6"
                                                                       style="padding-top: 6pt;padding-left: 5pt;text-indent: 0pt;text-align: left;">
                                                                        Spot <i>(out of 2 total spots)</i></p></td>
                                                            </tr>
                                                            <tr style="height:27pt">
                                                                <td style="width:171pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                                                                    <p class="s5"
                                                                       style="padding-top: 6pt;padding-left: 5pt;text-indent: 0pt;text-align: left;">
                                                                        Ad Space</p></td>
                                                                <td style="width:141pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                                                                    <p class="s8"
                                                                       style="padding-top: 6pt;padding-left: 5pt;text-indent: 0pt;text-align: left;">
                                                                        (See Advertise Page)</p></td>
                                                                <td style="width:156pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                                                                    <p class="s6"
                                                                       style="padding-top: 6pt;padding-left: 5pt;text-indent: 0pt;text-align: left;">
                                                                        N/A</p></td>
                                                            </tr>
                                                        </table>
                                                        <p style="text-indent: 0pt;text-align: left;"><br/></p>
                                                        <p class="s9"
                                                           style="padding-top: 3pt;text-indent: 0pt;text-align: center;">
                                                            Table 1.1</p>
                                                        <p style="text-indent: 0pt;text-align: left;"><br/></p></li>
                                                    <li style="padding-left: 41pt;text-indent: -18pt;text-align: left;">
                                                        <h2 style="display: inline;">SUBMISSION, USAGE &amp;
                                                            PARTICIPATION</h2></li>
                                                </ul>
                                            </li>
                                        </ol>
                                        <p style="text-indent: 0pt;text-align: left;"><br/></p>
                                        <ol id="l6">
                                            <li style="padding-left: 41pt;text-indent: -18pt;line-height: 108%;text-align: justify;">
                                                <p style="display: inline;">Any and all submissions must be properly
                                                    categorized and must meet the parameters outlined for the categories
                                                    outlined in <b>Table 2.2 on Page 12 </b>of these Terms &amp;
                                                    Conditions. Works submitted that fail to adhere to the guidelines
                                                    and/or Terms and Conditions are subject to removal. IndieWise
                                                    reserves the right to determine if a project fails to adhere to the
                                                    guidelines.</p>
                                                <p style="text-indent: 0pt;text-align: left;"><br/></p></li>
                                            <li style="padding-left: 41pt;text-indent: -18pt;text-align: left;"><h2
                                                        style="display: inline;">There is No Fee Required to Register,
                                                    Submit or Participate in the “Festival”.</h2>
                                                <p style="text-indent: 0pt;text-align: left;"><br/></p></li>
                                            <li style="padding-left: 41pt;text-indent: -18pt;line-height: 108%;text-align: justify;">
                                                <p style="display: inline;">IndieWise is a platform strictly for
                                                    Independent Filmmakers with Original Content. We will not accept any
                                                    Non-Independent, Studio, and/or Mainstream Project that already has
                                                    wide or theatrical distribution, unless you can prove you
                                                    exclusively own the Project rights or that the distributor has
                                                    granted you permission, in writing, to enter the Festival.</p>
                                                <p style="text-indent: 0pt;text-align: left;"><br/></p></li>
                                            <li style="padding-left: 41pt;text-indent: -18pt;line-height: 108%;text-align: justify;">
                                                <p style="display: inline;">Festival reserves the sole and exclusive
                                                    right to determine if previously released, previously or currently
                                                    distributed Project will be eligible for the Festival. User is
                                                    solely and exclusively responsible for any works submitted that are
                                                    in violation of copyright.</p></li>
                                        </ol>
                                        <p style="text-indent: 0pt;text-align: left;"><br/></p>
                                        <ol id="l7">
                                            <li style="padding-top: 3pt;padding-left: 23pt;text-indent: -18pt;text-align: left;">
                                                <h2 style="display: inline;">Submission of Project:</h2>
                                                <p style="text-indent: 0pt;text-align: left;"><br/></p>
                                                <ol id="l8">
                                                    <li style="padding-left: 59pt;text-indent: -18pt;text-align: left;">
                                                        <h2 style="display: inline;">How to Submit:</h2>
                                                        <h2 style="padding-left: 59pt;text-indent: 0pt;line-height: 108%;text-align: left;">
                                                            Projects must be submitted either via URL Link using such
                                                            platforms as YouTube and Vimeo OR via directly .MP4 Video
                                                            File Upload.</h2></li>
                                                    <li style="padding-left: 59pt;text-indent: -18pt;text-align: left;">
                                                        <p style="display: inline;"><a
                                                                    href="https://www.getindiewise.com/profile/upload"
                                                                    style=" color: black; font-family:Arial, sans-serif; font-style: normal; font-weight: bold; text-decoration: none; font-size: 11pt;"
                                                                    target="_blank">Where to Submit: </a><a
                                                                    href="https://www.getindiewise.com/profile/upload"
                                                                    target="_blank">https://www.getindiewise.com/profile/upload</a>
                                                        </p></li>
                                                </ol>
                                            </li>
                                        </ol>
                                        <p style="text-indent: 0pt;text-align: left;"><br/></p>
                                        <ol id="l9">
                                            <li style="padding-top: 3pt;padding-left: 23pt;text-indent: -18pt;text-align: justify;">
                                                <p style="display: inline;">It is the sole responsibility of the User to
                                                    ensure that any Project submitted via URL Link (Youtube/Vimeo, etc.)
                                                    is correct and functions. The same is true for .MP4 Video File
                                                    Upload. In the event that a URL Link submission or .MP4 Video File
                                                    is unable to be viewed or fails to play, the Festival reserves the
                                                    right to disqualify or remove, without refund of any or all service
                                                    fees previously collected from the User, any Project for which such
                                                    aforementioned or similar issues should arise. However, the user has
                                                    the option to re- upload a working URL Link or .MP4 Video
                                                    File<b>.</b></p>
                                                <p style="text-indent: 0pt;text-align: left;"><br/></p></li>
                                            <li style="padding-left: 23pt;text-indent: -18pt;text-align: justify;"><p
                                                        style="display: inline;">Upon completion of the Festival
                                                    selection process, the Festival will attempt to contact the User
                                                    using the contact information provided on the submission form to
                                                    notify the User of the Project’s acceptance status. The Festival
                                                    disavows any responsibility for, and will not be held responsible
                                                    for, any failure to contact the User for any reason, including but
                                                    not limited to incorrect contact information provided on the
                                                    submission form. It is the sole responsibility of the User to ensure
                                                    that the contact information provided on the submission form is
                                                    correct and up to date.</p>
                                                <p style="text-indent: 0pt;text-align: left;"><br/></p></li>
                                            <li style="padding-left: 23pt;text-indent: -18pt;text-align: justify;"><p
                                                        style="display: inline;">The Festival is under no obligation to
                                                    provide to the User or any other representative of the Project any
                                                    comments or feedback regarding the submitted Project, and IndieWise
                                                    disavows any responsibility for, and will not be held responsible or
                                                    liable for, the contents of any internal comments or feedback from
                                                    other Users regarding any Project that are or may be obtained by the
                                                    User or any other representative of the Project; any communications
                                                    by any representative of the Festival, the identity or identities of
                                                    any specific reviewers of the Project. Users understand that, while
                                                    it is not possible to delete a Critique, they do have the option to
                                                    Disable Critiques and Unlist their video, if they so desire.</p>
                                                <p style="text-indent: 0pt;text-align: left;"><br/></p></li>
                                            <li style="padding-left: 23pt;text-indent: -18pt;text-align: justify;"><p
                                                        style="display: inline;">IndieWise is not responsible for, or
                                                    obligated to provide any form of distribution, beyond its own
                                                    platform.</p>
                                                <p style="text-indent: 0pt;text-align: left;"><br/></p></li>
                                            <li style="padding-left: 23pt;text-indent: -18pt;text-align: justify;"><p
                                                        style="display: inline;">IndieWise is not obligated to provide
                                                    any form of payment or royalties to any User at any time, for any
                                                    purpose regarding participation in IndieWise. IndieWise is merely a
                                                    platform for Users to submit their Project for exposure, feedback,
                                                    and the viewing pleasure of audiences.</p></li>
                                        </ol>
                                        <p style="text-indent: 0pt;text-align: left;"><br/></p></li>
                                    <li style="padding-left: 23pt;text-indent: -18pt;text-align: left;"><h2
                                                style="display: inline;">COPYRIGHT, TRADEMARK, LEGAL, &amp; INTELLECTUAL
                                            PROPERTY GUIDELINES</h2>
                                        <p style="text-indent: 0pt;text-align: left;"><br/></p>
                                        <ol id="l10">
                                            <li style="padding-left: 23pt;text-indent: -18pt;line-height: 108%;text-align: justify;">
                                                <p style="display: inline;">User agrees to indemnify and hold harmless
                                                    IndieWise, should any Submission or Project violate ANY laws of ANY
                                                    country or the United States, including, but not limited to those
                                                    regarding property rights such as copyrights, distribution rights
                                                    violations, false statements</p>
                                                <p style="text-indent: 0pt;text-align: left;"><br/></p>
                                                <p style="padding-top: 3pt;padding-left: 23pt;text-indent: 0pt;line-height: 108%;text-align: justify;">
                                                    submitted on applications, bullying, criminal activities or
                                                    offenses, and any other illegality propounded on the Festival as a
                                                    result of the User submission. See Paragraph 10 below as also an
                                                    extension of this Paragraph.</p>
                                                <p style="text-indent: 0pt;text-align: left;"><br/></p></li>
                                            <li style="padding-left: 23pt;text-indent: -18pt;line-height: 108%;text-align: left;">
                                                <p style="display: inline;">User agrees to use IndieWise Services and
                                                    Deliverables in full compliance with all laws, requirements, and
                                                    regulations at all times; and will may not maliciously use, upload
                                                    viruses, attempt to circumvent the security procedures, hack, or
                                                    otherwise violate the stability, security, and privacy of the
                                                    website or the users of the websites or their systems.</p>
                                                <p style="text-indent: 0pt;text-align: left;"><br/></p></li>
                                            <li style="padding-left: 23pt;text-indent: -18pt;line-height: 108%;text-align: justify;">
                                                <p style="display: inline;">It is the sole responsibility of the User to
                                                    secure authorization and permission from copyright owner(s) of any
                                                    and all copyrighted content or materials included within the
                                                    submitted Project. IndieWise expressly disavows any responsibility
                                                    for, and will not be held responsible for, any unauthorized
                                                    inclusion of any copyrighted content or materials within or relating
                                                    to submitted Project, including any content materials that are or
                                                    may become the basis for any third party claims for copyright
                                                    infringement. The Festival reserves the right to disqualify, without
                                                    refund of any or all service fees previously collected from the
                                                    User, any Project with any unauthorized inclusion of copyrighted
                                                    content or materials. In the event that any claim, dispute, action
                                                    or proceeding shall be brought or asserted by any person or entity
                                                    that alleges the Project makes unauthorized or unlawful use of any
                                                    copyrighted content or material, User shall fully indemnify and hold
                                                    harmless IndieWise, and each of their representatives and affiliates
                                                    from any liability in connection therewith, and from any fees and
                                                    expenses, including but not limited to attorneys’ fees, that may
                                                    incur in connection therewith. The statements in this Paragraph
                                                    regarding liability and costs also are in full force and effect for
                                                    Paragraph 7 above.</p>
                                                <p style="text-indent: 0pt;text-align: left;"><br/></p></li>
                                            <li style="padding-left: 23pt;text-indent: -18pt;line-height: 108%;text-align: justify;">
                                                <p style="display: inline;">It is the sole responsibility of the User to
                                                    secure authorization and permission from the
                                                    Project/Copyright/Trademark Owners of any and all trademarked
                                                    content or materials included within the submitted Project. The
                                                    Festival expressly disavows any responsibility for, and will not be
                                                    held responsible for, any unauthorized inclusion of any trademarked
                                                    content or materials within or relating to submitted Project,
                                                    including any content materials that are or may become the basis for
                                                    any third party claims for trademark infringement, trademark
                                                    dilution or unfair competition. IndieWise reserves the right to
                                                    disqualify or remove, without refund of any or all service fees
                                                    previously collected from the User, any Project with any
                                                    unauthorized inclusion of trademarked content or materials. In the
                                                    event that any claim, dispute, action or proceeding shall be brought
                                                    or asserted by any person or entity that alleges the Project makes
                                                    unauthorized or unlawful use of any trademarked content or material,
                                                    User shall fully indemnify and hold harmless IndieWise, and each of
                                                    their representatives and affiliates from any liability in
                                                    connection therewith and from any fees and expenses, including but
                                                    not limited to attorneys’ fees, that any of them may incur in
                                                    connection therewith.</p>
                                                <p style="text-indent: 0pt;text-align: left;"><br/></p></li>
                                            <li style="padding-left: 23pt;text-indent: -18pt;line-height: 108%;text-align: justify;">
                                                <p style="display: inline;">It is the sole responsibility of the User to
                                                    clear all content of the Project from any and all actual or
                                                    potential legal claims or issues, including, without limitation,
                                                    claims based upon theories or libel, defamation, slander, invasion
                                                    of privacy, violation of rights or publicity,</p></li>
                                        </ol>
                                        <p style="text-indent: 0pt;text-align: left;"><br/></p>
                                        <p style="padding-top: 3pt;padding-left: 23pt;text-indent: 0pt;line-height: 108%;text-align: justify;">
                                            theft or trade secrets, breach of confidence, breach of confidential
                                            relationship, and breach of expressed or implied contract (“Third Party
                                            Claim(s)”). IndieWise expressly disavows any responsibility for, and will
                                            not be held responsible for, any unauthorized inclusion of any trademarked
                                            content or materials within or relating to submitted Project, including any
                                            content materials that are or may become the basis for any Third Party
                                            Claims based upon any of the foregoing legal theories or others. IndieWise
                                            reserves the right to disqualify or remove, without refund of any or all
                                            service fees previously collected from the User, any Project that is or may
                                            become the subject of any Third Party Claims. In the event that any Third
                                            Party Claim(s) shall be asserted by any person or entity, User shall fully
                                            indemnify and hold harmless IndieWise, and each of their representatives and
                                            affiliates from any liability in connection therewith and from any fees and
                                            expenses, including but not limited to attorneys’ fees, that any of them may
                                            incur in connection therewith.</p>
                                        <p style="text-indent: 0pt;text-align: left;"><br/></p></li>
                                    <li style="padding-left: 23pt;text-indent: -18pt;text-align: left;"><h2
                                                style="display: inline;">LANGUAGE GUIDELINES</h2>
                                        <p style="text-indent: 0pt;text-align: left;"><br/></p>
                                        <p style="padding-left: 23pt;text-indent: -18pt;line-height: 108%;text-align: justify;">
                                            1. Users submitting Projects that contain significant non-English spoken
                                            dialogue must provide on-screen English subtitles. Music videos do not have
                                            to meet this criteria but all other works must meet this criteria.
                                            Documentaries that have English voice translation within do not have to
                                            contain this English sub-titling as well, so long as some type of
                                            translation is provided by voice. The Festival reserves the right to
                                            disqualify or remove, without refund of any or all service fees previously
                                            collected from the User, any Project that contains significant non-English
                                            spoken dialogue that does not include proper on- screen English
                                            subtitles.</p>
                                        <p style="text-indent: 0pt;text-align: left;"><br/></p></li>
                                    <li style="padding-left: 23pt;text-indent: -18pt;text-align: left;"><h2
                                                style="display: inline;">INDIEWISE NOMINATIONS / AWARDS</h2>
                                        <p style="text-indent: 0pt;text-align: left;"><br/></p>
                                        <ol id="l11">
                                            <li style="padding-left: 23pt;text-indent: -18pt;text-align: justify;"><p
                                                        style="display: inline;">Regarding IndieWise Nominations /
                                                    Awards, User understands that, upon getting 5 or more nominations
                                                    for the exact same award, they are eligible to be awarded with a Win
                                                    in that particular category, and will receive an e-mail
                                                    notification, with Subject: <i>“You’ve won an IndieWise Award!
                                                        (Unofficial)”</i>, alerting them of their pending Win. For eg.
                                                    Best Director, etc. User understands that they need to reply to the
                                                    notification e-mail, in order to confirm receipt, within 30 days in
                                                    order to maintain eligibility. Furthermore, IndieWise reserves the
                                                    right to verify and confirm that the nominations came from
                                                    legitimate IndieWise User accounts and that all 5 Users were indeed
                                                    different individuals, not including said User. If any of the
                                                    nominations are found to be illegitimate, IndieWise reserves the
                                                    right to revoke the said Award from the User and their respective
                                                    User Profile. User understands that repeated offenses as such, may
                                                    result in being banned from IndieWise. Illegitimate nominations
                                                    include, but are not limited to, bogus accounts created by the same
                                                    User, fake accounts, fake e-mail addresses, bots, accounts not
                                                    associated with IndieWise. On the other hand, upon the successful
                                                    verification of the legitimacy of the nominations, the User should
                                                    be provided with the Official IndieWise Laurel via e-mail within 48
                                                    hours. However, IndieWise is held harmless for any failure to verify
                                                    the legitimacy of nominations or failure to detect illegitimate
                                                    nominations, as well as failure to send the Official IndieWise
                                                    Laural within the aforementioned 48 hours. Furthermore, a Win in a
                                                    particular category,</p>
                                                <p style="text-indent: 0pt;text-align: left;"><br/></p>
                                                <p style="padding-top: 3pt;padding-left: 23pt;text-indent: 0pt;text-align: justify;">
                                                    as aforementioned, is not exclusive to any particular User or
                                                    Project, and any Project that meets the same number of 5 nominations
                                                    in a given category, is also eligible for the such an Award.
                                                    IndieWise reserves the right to adjust the criteria for obtaining an
                                                    Award at its own will and discretion, and with or without notice, at
                                                    any time. IndieWise is not held responsible for any bounced emails
                                                    or failure to send emails with Official IndieWise Laurels or other
                                                    prizes or awards. Indiewise is not held responsible for any
                                                    misrepresentation of what the awards, laurels, or other prizes
                                                    represent.</p>
                                                <p style="text-indent: 0pt;text-align: left;"><br/></p></li>
                                            <li style="padding-left: 23pt;text-indent: -18pt;text-align: justify;"><p
                                                        style="display: inline;">User understands that they may not
                                                    critique their own work, or nominate themselves for any awards, due
                                                    to conflict of interests and usual bias. User agrees to adhere to
                                                    this rule without challenge. However, User may indeed post Reaction
                                                    Emoticons to their own videos.</p></li>
                                        </ol>
                                        <p style="text-indent: 0pt;text-align: left;"><br/></p></li>
                                    <li style="padding-left: 23pt;text-indent: -18pt;text-align: left;"><h2
                                                style="display: inline;">MATURE OR INAPPROPRIATE / PROHIBITED
                                            CONTENT</h2>
                                        <p style="text-indent: 0pt;text-align: left;"><br/></p>
                                        <ol id="l12">
                                            <li style="padding-left: 23pt;text-indent: -18pt;text-align: justify;"><p
                                                        style="display: inline;">User agrees to <b>not </b>upload any
                                                    content that is pornographic, racially or culturally offensive,
                                                    excessively violent, of a bullying nature, directly harmful to any
                                                    individual, copyright infringement, spam, and/or unlawful in any
                                                    matter. IndieWise reserves the right to remove any such content
                                                    aforementioned. IndieWise is held harmless for failure to detect or
                                                    remove such content, although it is our goal to have this done
                                                    expeditiously.</p>
                                                <p style="text-indent: 0pt;text-align: left;"><br/></p></li>
                                            <li style="padding-left: 23pt;text-indent: -18pt;text-align: justify;"><p
                                                        style="display: inline;">User expressly agrees to Select the
                                                    “Contains Mature Content” Option on the Upload Page, at the time of
                                                    Uploading, any content that is inappropriate for General Audiences
                                                    (those under 15). This includes, but is not limited to content that
                                                    contains: Violence, Strong Language, Thematic Elements, Sexual
                                                    Content, Nudity, Gore, Disturbing Images, or content thought
                                                    inappropriate for a General Audience from the perspective of a
                                                    reasonable individual.</p></li>
                                        </ol>
                                        <p style="text-indent: 0pt;text-align: left;"><br/></p></li>
                                    <li style="padding-left: 23pt;text-indent: -18pt;text-align: left;"><h2
                                                style="display: inline;">UNLISTING AND PUBLICIZING VIDEOS</h2>
                                        <p style="text-indent: 0pt;text-align: left;"><br/></p>
                                        <p style="padding-left: 23pt;text-indent: -18pt;line-height: 108%;text-align: left;">
                                            1. User understands that, although the default setting for Uploading a video
                                            is “Public” they may choose to “Unlist” a video at their own discretion,
                                            during the Upload process. By unlisting a video, that video will not be
                                            public or present on the Homepage, Browse Page, Latest Page, or any page on
                                            the IndieWise website. The video will be present only on that uploader’s
                                            profile page, and labeled as Unlisted. The unlisted video should only be
                                            able to be viewed by those who the uploader shares that Video’s URL with
                                            directly, or using other sharing functions and means. Furthermore, user has
                                            the option to change a video from Unlisted, to Public, and vice versa. User
                                            agrees that IndieWise is to be held harmless for any of the following,
                                            including but not limited to: the User’s accidental listing or unlisting of
                                            a video or similar content, any browser or site programming issues that
                                            cause the unlist feature(s), or any features of the site, to malfunction.
                                            IndieWise is indemnified and held harmless from any and all unintended
                                            results that happen or are experienced by site users, visitors, or third
                                            parties on account of: ignorance, programming issues, mistakes, human error,
                                            labeling connotations or misinterpretations</p>
                                        <p style="text-indent: 0pt;text-align: left;"><br/></p>
                                        <p style="padding-top: 3pt;padding-left: 23pt;text-indent: 0pt;line-height: 108%;text-align: left;">
                                            of the meaning or functionality of a particular feature or features or the
                                            overall website generally.</p>
                                        <p style="text-indent: 0pt;text-align: left;"><br/></p></li>
                                    <li style="padding-top: 7pt;padding-left: 23pt;text-indent: -18pt;text-align: left;">
                                        <h2 style="display: inline;">LIMITED LICENSE TO USE</h2>
                                        <p style="text-indent: 0pt;text-align: left;"><br/></p>
                                        <p style="padding-left: 23pt;text-indent: -18pt;line-height: 108%;text-align: left;">
                                            1. The User shall not acquire any intellectual property rights under this
                                            Terms and Conditions Agreement, except the limited right to use as set forth
                                            above. The User acknowledges that, as between IndieWise and said User, all
                                            information, programming code, all related copyrights, and all other
                                            intellectual property rights, are (and at all times will be) the property of
                                            IndieWise. This also applies if suggestions, comments, and/or ideas made by
                                            the User are incorporated into IndieWise during the period of this
                                            Agreement. IndieWise reserves the right to review all communication through
                                            the website between Users, Participant, Advertisers, and so forth.</p>
                                        <p style="text-indent: 0pt;text-align: left;"><br/></p></li>
                                    <li style="padding-left: 23pt;text-indent: -18pt;text-align: left;"><h2
                                                style="display: inline;">INDEMNITY</h2>
                                        <p style="text-indent: 0pt;text-align: left;"><br/></p>
                                        <p style="padding-left: 23pt;text-indent: -18pt;line-height: 108%;text-align: left;">
                                            1. User agrees to indemnify, defend, and hold IndieWise, its officers,
                                            shareholders, directors, managers, and employees harmless from any claim,
                                            demand, action, liabilities, costs and expenses, losses or damages,
                                            including reasonable attorney&#39;s fees, brought by a third party against
                                            IndieWise, arising out of, relating to, or resulting from (A) your use of
                                            the Website, Mobile App, or services provided by IndieWise; (B) any and all
                                            payment obligations incurred through the use of IndieWise, or your failure
                                            to pay any invoice or dispute of any payment; (C) your decision to submit
                                            personal financial information or credit card information through IndieWise;
                                            (D) your decision to submit projects, extend or accept offers from service
                                            providers; (E) any claims or breach of contract made by service providers
                                            which you worked with through IndieWise; (F) any claims or liabilities
                                            related to the payment and reporting of taxes for any payments made through
                                            the IndieWise; (g) your breach of this Agreement; or (h) any intentional
                                            wrongdoing by any other user on IndieWise with whom you interacted. User
                                            releases all liability and agrees to hold IndieWise harmless from any
                                            losses, claims, or other damage whatsoever, of every kind and nature,
                                            arising out of or in any way related to Customer’s collection, processing,
                                            use, or transfer of Participant’s Personally Identifiable Information,
                                            including, but not limited to a person’s name, address, email, birthday,
                                            age, gender, phone number, and credit card number.</p>
                                        <p style="text-indent: 0pt;text-align: left;"><br/></p></li>
                                    <li style="padding-left: 23pt;text-indent: -18pt;text-align: left;"><h2
                                                style="display: inline;">TAXES</h2>
                                        <p style="text-indent: 0pt;text-align: left;"><br/></p>
                                        <p style="padding-left: 23pt;text-indent: -18pt;line-height: 108%;text-align: left;">
                                            1. All Order costs and other amounts payable to IndieWise are net of taxes
                                            and are payable in full to IndieWise without deduction. Customer shall be
                                            solely responsible for all taxes including sales, use, ad valorem, excise,
                                            privilege, and other taxes, withholdings, VAT, tariffs, duties or any other
                                            governmental assessments, however</p>
                                        <p style="text-indent: 0pt;text-align: left;"><br/></p>
                                        <p style="padding-top: 3pt;padding-left: 23pt;text-indent: 0pt;line-height: 108%;text-align: left;">
                                            designated. Customer shall reimburse IndieWise immediately in the event of
                                            payment thereof by IndieWise. In the event that IndieWise is required by a
                                            taxing jurisdiction to collect sales tax directly, such taxes will be
                                            separately stately on any invoices or Order forms and included as a distinct
                                            line item labeled “Sales Tax”.</p>
                                        <p style="text-indent: 0pt;text-align: left;"><br/></p></li>
                                    <li style="padding-left: 23pt;text-indent: -18pt;text-align: left;"><h2
                                                style="display: inline;">WARRANTY DISCLAIMER</h2>
                                        <p style="text-indent: 0pt;text-align: left;"><br/></p>
                                        <ol id="l13">
                                            <li style="padding-left: 23pt;text-indent: -18pt;line-height: 108%;text-align: left;">
                                                <p style="display: inline;">IndieWise is provided &quot;as-is&quot; and
                                                    &quot;as available&quot; without any express or implied warranties
                                                    including, without limitation, warranties of merchantability,
                                                    non-infringement, and fitness for a particular purpose. IndieWise
                                                    tries to keep the website safe, secure, bug-free, and available, but
                                                    we do not guarantee that the IndieWise website will be safe, secure,
                                                    available, or bug-free. You use the website at your own risk.
                                                    IndieWise does not warrant or guarantee the quality, reliability,
                                                    accuracy, availability and security of the indieWise website, or
                                                    content on the website.</p>
                                                <p style="text-indent: 0pt;text-align: left;"><br/></p></li>
                                            <li style="padding-left: 23pt;text-indent: -18pt;line-height: 108%;text-align: left;">
                                                <p style="display: inline;">The IndieWise website is developed and
                                                    controlled in North America. We do not guarantee that the website is
                                                    available or suitable in other jurisdictions and those that access
                                                    the site from other jurisdictions do so at their own risk and are
                                                    solely responsible to comply with all applicable laws.</p>
                                                <p style="text-indent: 0pt;text-align: left;"><br/></p></li>
                                            <li style="padding-left: 23pt;text-indent: -18pt;line-height: 108%;text-align: left;">
                                                <p style="display: inline;">Any website links mentioned in these Terms
                                                    and Conditions or the IndieWise website are provided for the
                                                    good-faith reason of being helpful. Any mistakes in these links,
                                                    programming issues interrupting them, or invalidity of them on
                                                    account of becoming outdated, is not the responsibility of IndieWise
                                                    and IndieWise is held harmless for any damages that may occur as a
                                                    result of this.</p>
                                                <p style="text-indent: 0pt;text-align: left;"><br/></p></li>
                                            <li style="padding-left: 23pt;text-indent: -18pt;line-height: 108%;text-align: left;">
                                                <p style="display: inline;">The captions and bold paragraph headings
                                                    included in this Agreement are for convenience only and shall not be
                                                    given any legal or contractual effect.</p></li>
                                        </ol>
                                        <p style="text-indent: 0pt;text-align: left;"><br/></p></li>
                                    <li style="padding-left: 23pt;text-indent: -18pt;text-align: left;"><h2
                                                style="display: inline;">LIMITATION OF LIABILITY</h2>
                                        <p style="text-indent: 0pt;text-align: left;"><br/></p>
                                        <ol id="l14">
                                            <li style="padding-left: 23pt;text-indent: -18pt;line-height: 108%;text-align: left;">
                                                <p style="display: inline;">You agree that in no event shall IndieWise
                                                    or our third party service providers be liable to you or any other
                                                    member for any incidental, special, indirect, consequential or
                                                    punitive damages whatsoever, including but not limited to, loss of
                                                    business opportunities, loss of distribution opportunities, loss of
                                                    profits, disclosure of confidential information, loss of privacy, or
                                                    loss of goodwill, arising out of or related to your use of the
                                                    IndieWise website or service, even if IndieWise has been advised of
                                                    the possibility of such damages.</p>
                                                <p style="text-indent: 0pt;text-align: left;"><br/></p></li>
                                            <li style="padding-left: 23pt;text-indent: -18pt;line-height: 108%;text-align: left;">
                                                <p style="display: inline;">Notwithstanding anything to the contrary,
                                                    IndieWise’s aggregate liability to you for any cause or claim
                                                    related to the IndieWise website or service will at all times not
                                                    exceed the total service fees paid by you to IndieWise during the
                                                    three (3) month period immediately preceding the determination of
                                                    liability. IndieWise’s liability shall at all times be limited to
                                                    the full extent permitted by applicable law.</p></li>
                                        </ol>
                                        <p style="text-indent: 0pt;text-align: left;"><br/></p></li>
                                    <li style="padding-top: 3pt;padding-left: 23pt;text-indent: -18pt;text-align: left;">
                                        <h2 style="display: inline;">RELEASE OF LIABILITY FROM DAMAGES</h2>
                                        <p style="text-indent: 0pt;text-align: left;"><br/></p>
                                        <ol id="l15">
                                            <li style="padding-left: 23pt;text-indent: -18pt;line-height: 108%;text-align: left;">
                                                <p style="display: inline;">In the event that you have a dispute with
                                                    another party on IndieWise, you affirmatively agree to hold
                                                    IndieWise, and our officers, directors, managers, and employees,
                                                    harmless from any losses, claims, or other damage whatsoever,
                                                    whether actual or consequential, of every kind and nature, arising
                                                    out of or in any way related to such dispute.</p>
                                                <p style="text-indent: 0pt;text-align: left;"><br/></p></li>
                                            <li style="padding-left: 23pt;text-indent: -18pt;line-height: 108%;text-align: left;">
                                                <p style="display: inline;">You expressly waive Section 1542 of the
                                                    California Civil Code, and any similar law in any other
                                                    jurisdiction, which provides that: &quot;A general release does not
                                                    extend to claims which the creditor does not know or suspect to
                                                    exist in his favor at the time of executing the release which if
                                                    known by him must have materially affected his settlement with the
                                                    debtor.&quot;</p></li>
                                        </ol>
                                        <p style="text-indent: 0pt;text-align: left;"><br/></p></li>
                                    <li style="padding-left: 23pt;text-indent: -18pt;text-align: left;"><h2
                                                style="display: inline;">ATTORNEY&#39;S FEES.</h2>
                                        <p style="text-indent: 0pt;text-align: left;"><br/></p>
                                        <p style="padding-left: 23pt;text-indent: -18pt;line-height: 108%;text-align: left;">
                                            1. In any legal action between the User and IndieWise concerning this
                                            Agreement, the prevailing party shall be entitled to recover reasonable
                                            attorney fees and costs.</p>
                                        <p style="text-indent: 0pt;text-align: left;"><br/></p></li>
                                    <li style="padding-left: 23pt;text-indent: -18pt;text-align: left;"><h2
                                                style="display: inline;">SEVERABILITY</h2>
                                        <p style="text-indent: 0pt;text-align: left;"><br/></p>
                                        <p style="padding-left: 23pt;text-indent: -18pt;line-height: 108%;text-align: left;">
                                            1. This Agreement is a complete and exclusive statement of the entire
                                            agreement between you and IndieWise concerning the Website / Mobile App. If
                                            any portion of this Agreement is found to be illegal or unenforceable,
                                            neither the validity nor enforceability of the remainder of the Agreement
                                            shall be affected. The failure of IndieWise to enforce its rights under this
                                            Agreement at any time for any period shall not be construed as a waiver of
                                            such rights. Furthermore, this agreement supersedes any and all previous
                                            agreements between User and IndieWise</p>
                                        <p style="text-indent: 0pt;text-align: left;"><br/></p></li>
                                    <li style="padding-left: 23pt;text-indent: -18pt;text-align: left;"><h2
                                                style="display: inline;">GOVERNING LAW</h2>
                                        <p style="text-indent: 0pt;text-align: left;"><br/></p>
                                        <ol id="l16">
                                            <li style="padding-left: 23pt;text-indent: -18pt;line-height: 108%;text-align: left;">
                                                <p style="display: inline;">These terms and conditions and any such
                                                    legalities resulting are governed by the law of either the Bahamas
                                                    or Delaware, at the exclusive choice of IndieWise. Any and all
                                                    claims relating to or arising out of this contract, or the breach
                                                    thereof, whether sounding in contract, tort or otherwise, shall
                                                    likewise be governed by such laws</p>
                                                <p style="text-indent: 0pt;text-align: left;"><br/></p></li>
                                            <li style="padding-left: 23pt;text-indent: -18pt;line-height: 108%;text-align: left;">
                                                <p style="display: inline;">You consent to the exclusive jurisdiction
                                                    and venue of the federal and state courts located in the
                                                    aforementioned in any action arising out of or relating to this
                                                    Agreement. You waive any objection you might have to jurisdiction or
                                                    venue of such forums or that the forum is inconvenient. You agree
                                                    not to bring any such action in any other jurisdiction or venue to
                                                    which either party might be entitled by domicile or otherwise.</p>
                                                <p style="text-indent: 0pt;text-align: left;"><br/></p></li>
                                            <li style="padding-top: 3pt;padding-left: 23pt;text-indent: -18pt;line-height: 108%;text-align: left;">
                                                <p style="display: inline;">You may not assign or transfer all or any
                                                    part of your rights under this Agreement without the express written
                                                    consent of IndieWise.</p></li>
                                        </ol>
                                        <p style="text-indent: 0pt;text-align: left;"><br/></p></li>
                                    <li style="padding-left: 23pt;text-indent: -18pt;text-align: left;"><h2
                                                style="display: inline;">GENERAL TERMS</h2>
                                        <p style="text-indent: 0pt;text-align: left;"><br/></p>
                                        <ol id="l17">
                                            <li style="padding-left: 23pt;text-indent: -18pt;line-height: 108%;text-align: left;">
                                                <p style="display: inline;">Notwithstanding anything to the contrary,
                                                    the following sections survive any termination of this Agreement
                                                    indefinitely:</p>
                                                <p style="text-indent: 0pt;text-align: left;"><br/></p></li>
                                        </ol>
                                    </li>
                                    <li style="padding-left: 23pt;text-indent: -18pt;text-align: left;"><h2
                                                style="display: inline;">INDEMNITY</h2></li>
                                    <li style="padding-top: 1pt;padding-left: 23pt;text-indent: -18pt;text-align: left;">
                                        <h2 style="display: inline;">LIMITATION OF LIABILITY</h2></li>
                                    <li style="padding-top: 1pt;padding-left: 23pt;text-indent: -18pt;text-align: left;">
                                        <h2 style="display: inline;">RELEASE OF LIABILITY FROM DAMAGES</h2></li>
                                    <li style="padding-left: 23pt;text-indent: -18pt;text-align: left;"><h2
                                                style="display: inline;">SEVERABILITY</h2>
                                        <p style="text-indent: 0pt;text-align: left;"><br/></p>
                                        <ul id="l18">
                                            <li style="padding-top: 3pt;padding-left: 41pt;text-indent: -18pt;text-align: left;">
                                                <h2 style="display: inline;">SUBMISSION CATEGORIES &amp; ELIGIBILITY
                                                    REQUIREMENTS</h2>
                                                <p style="text-indent: 0pt;text-align: left;"><br/></p>
                                                <ol id="l19">
                                                    <ol id="l20">
                                                        <li style="padding-left: 41pt;text-indent: -18pt;text-align: justify;">
                                                            <p style="display: inline;">Projects submitted to IndieWise
                                                                may submit in one of <b>twelve (12) </b>submission
                                                                categories. The Festival reserves the right to determine
                                                                eligibility of any Project for any submission category.
                                                                Festival reserves the right to re-classify the Project
                                                                and its category or disqualify for improper category
                                                                selection. The following is a description of each
                                                                submission category:</p></li>
                                                    </ol>
                                                </ol>
                                                <p style="text-indent: 0pt;text-align: left;"><br/></p>
                                                <table style="border-collapse:collapse;" cellspacing="0">
                                                    <tr style="height:23pt">
                                                        <td style="width:183pt;border-bottom-style:solid;border-bottom-width:1pt">
                                                            <p class="s10"
                                                               style="padding-left: 16pt;padding-right: 16pt;text-indent: 0pt;line-height: 10pt;text-align: center;">
                                                                Content Type</p></td>
                                                    </tr>
                                                    <tr style="height:30pt">
                                                        <td style="width:183pt;border-top-style:solid;border-top-width:1pt">
                                                            <p style="text-indent: 0pt;text-align: left;"><br/></p>
                                                            <p class="s11"
                                                               style="padding-left: 16pt;padding-right: 16pt;text-indent: 0pt;text-align: center;">
                                                                Feature Narrative Films</p></td>
                                                    </tr>
                                                    <tr style="height:23pt">
                                                        <td style="width:183pt"><p class="s11"
                                                                                   style="padding-top: 5pt;padding-left: 16pt;padding-right: 16pt;text-indent: 0pt;text-align: center;">
                                                                Music Videos</p></td>
                                                    </tr>
                                                    <tr style="height:23pt">
                                                        <td style="width:183pt"><p class="s11"
                                                                                   style="padding-top: 5pt;padding-left: 16pt;padding-right: 16pt;text-indent: 0pt;text-align: center;">
                                                                Trailers</p></td>
                                                    </tr>
                                                    <tr style="height:23pt">
                                                        <td style="width:183pt"><p class="s11"
                                                                                   style="padding-top: 4pt;padding-left: 16pt;padding-right: 16pt;text-indent: 0pt;text-align: center;">
                                                                Short Narrative Films</p></td>
                                                    </tr>
                                                    <tr style="height:23pt">
                                                        <td style="width:183pt"><p class="s11"
                                                                                   style="padding-top: 5pt;padding-left: 16pt;padding-right: 16pt;text-indent: 0pt;text-align: center;">
                                                                Short Documentaries</p></td>
                                                    </tr>
                                                    <tr style="height:23pt">
                                                        <td style="width:183pt"><p class="s11"
                                                                                   style="padding-top: 4pt;padding-left: 15pt;padding-right: 16pt;text-indent: 0pt;text-align: center;">
                                                                Short Animation</p></td>
                                                    </tr>
                                                    <tr style="height:23pt">
                                                        <td style="width:183pt"><p class="s11"
                                                                                   style="padding-top: 4pt;padding-left: 16pt;padding-right: 16pt;text-indent: 0pt;text-align: center;">
                                                                Sizzle Reels</p></td>
                                                    </tr>
                                                    <tr style="height:23pt">
                                                        <td style="width:183pt"><p class="s11"
                                                                                   style="padding-top: 5pt;padding-left: 16pt;padding-right: 16pt;text-indent: 0pt;text-align: center;">
                                                                Web Series/Reality Show Pilots</p></td>
                                                    </tr>
                                                    <tr style="height:23pt">
                                                        <td style="width:183pt"><p class="s11"
                                                                                   style="padding-top: 4pt;padding-left: 16pt;padding-right: 16pt;text-indent: 0pt;text-align: center;">
                                                                Demo Reels</p></td>
                                                    </tr>
                                                    <tr style="height:86pt">
                                                        <td style="width:183pt"><p class="s11"
                                                                                   style="padding-top: 5pt;padding-left: 36pt;padding-right: 27pt;text-indent: 26pt;line-height: 199%;text-align: left;">
                                                                Screenplays Feature Documentaries</p>
                                                            <p class="s11"
                                                               style="padding-left: 15pt;padding-right: 16pt;text-indent: 0pt;text-align: center;">
                                                                Feature Animation</p>
                                                            <p style="text-indent: 0pt;text-align: left;"><br/></p>
                                                            <p class="s12"
                                                               style="padding-left: 16pt;padding-right: 16pt;text-indent: 0pt;text-align: center;">
                                                                TABLE 2.2</p></td>
                                                    </tr>
                                                </table>
                                                <p style="text-indent: 0pt;text-align: left;"><br/></p>
                                                <p style="text-indent: 0pt;text-align: left;"><br/></p></li>
                                            <li style="padding-left: 41pt;text-indent: -18pt;text-align: left;"><h2
                                                        style="display: inline;">COMMERCIALS AND ADVERTISEMENTS</h2>
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                                <p style="text-indent: 0pt;text-align: left;"><br/></p>
                                <p style="padding-left: 41pt;text-indent: -18pt;text-align: left;">1. For this type of
                                    content, you would be required to purchase a Featured Listing, Ad Space, or HotSpot.
                                    <i><b>See Table 1.1 on Page 3</b></i></p>
                                <p style="text-indent: 0pt;text-align: left;"><br/></p>
                                <h2 style="padding-left: 5pt;text-indent: 0pt;line-height: 108%;text-align: left;"><i>NOTE: </i>Submission
                                    Content: <span class="p">All of the above types of content will be considered for screening. If there is something you wish to submit that is not under either of these categories, be sure to let us know and we will see how we can assist you. We encourage all types of art and do not wish to discourage any Project, within reason. </span>IndieWise
                                    reserves the right to increase or decrease the categories or to change the criteria
                                    for each category from time to time at its sole will by way of updating the Terms
                                    and Conditions.</h2>
                            </article>
                        </div>
                    </div>
                </section>
            </div><!-- end left side content area -->
            <!-- sidebar -->
            <!--<static-side-bar></static-side-bar>-->
            <!-- end sidebar -->
        </div>
    </section><!-- End Category Content-->

@endsection
