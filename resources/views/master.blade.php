<!DOCTYPE html>
<html lang="en" xmlns:v-on="http://www.w3.org/1999/xhtml">
@include('shared._head')
<body id="body" style="background-color: #fafafa !important;">

<div id="app" v-cloak>

    <nav-mobile></nav-mobile>

    <md-layout md-flex md-column>

        <nav-header></nav-header>

        <div v-if="isAuthenticated && isNotVerified" class="callout alert-box warning" data-closable>
            Please check your e-mail and verify your account to get involved! Check your spam folder just in case.
            <a v-on:click="requestVerificationEmail" data-close>Click here to resend verification email</a>
            <button class="close-button" aria-label="Dismiss alert" type="button" data-close>
                <span aria-hidden="true">&times;</span>
            </button>
        </div>

        {{--<div v-if="justVerified()" class="callout alert-box warning" data-closable>
            Account Verification Successful!
            <button class="close-button" aria-label="Dismiss alert" type="button" data-close>
                <span aria-hidden="true">&times;</span>
            </button>
        </div>--}}

        <authentication-modal></authentication-modal>

        {{-- Causes Error: Cannot read property 'parentNode' of null --}}
        <md-snackbar md-position="bottom center" ref="snackbar" :md-duration="toastDuration">
            <span v-text="toastMessage"></span>
            <md-button v-if="toastType === 'action'" class="md-accent" md-theme="light-blue" @click.prevent="toastAction" v-text="toastButton"></md-button>
            <md-button class="md-accent" md-theme="light-blue" @click.prevent="$refs.snackbar.close()">Close</md-button>
        </md-snackbar>

        @yield('layout')

        @include('shared.footer')

    </md-layout>

    {{--@include('shared.offCanvasRight')--}}
</div>

@include('shared._footer')
</body>
</html>
