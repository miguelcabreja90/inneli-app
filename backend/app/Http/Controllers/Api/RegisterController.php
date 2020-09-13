<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Providers\RouteServiceProvider;
use App\Role;
use App\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Contracts\Foundation\Application;
use Illuminate\Foundation\Auth\RegistersUsers;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Routing\Redirector;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

/**
 * @group Auth endpoints
 */
class RegisterController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Register Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles the registration of new users as well as their
    | validation and creation. By default this controller uses a trait to
    | provide this functionality without requiring any additional code.
    |
    */

    use RegistersUsers;

    /**
     * Where to redirect users after registration.
     *
     * @var string
     */
    protected $redirectTo = RouteServiceProvider::HOME;

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest');
    }

    /**
     * Handle a registration request for the application.
     *
     * @bodyParam name string required The name of the user. Example: Demo
     * @bodyParam email email required The email of the user. Example: demo@demo.com
     * @bodyParam password password required The password of the user. Example: password
     * @bodyParam password_confirmation password required The password confirmation of the user. Example: password
     *
     * @response 200 {
     *    "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiNDc5OTg4MjFkMTZlZjUxOTRjOWZhYWFkMzFlZDY0NzljMzliZWMzMjg1NjU2YWViNzdkMmM3ZGMwOGNhNGFiOTZiOTVkZmEwNTE3OWE0ZTciLCJpYXQiOjE1OTAzOTEzNDMsIm5iZiI6MTU5MDM5MTM0MywiZXhwIjoxNjIxOTI3MzQzLCJzdWIiOiIyIiwic2NvcGVzIjpbXX0.onsWJtrF9UT2XEbSsYQbVLvr-TZKGbqIoj4w5W-sEqbrcGep-mRuHJDY1-tY7E_-KxSV3yTrOAtyWFIv51atVFs5m6abF-QWNUpGYMlfEhjQbN6S5QOLXD7deiatSGH0dIXX6v7j7IdUeLgJ5t_6z7oD2s0bAuzfhrHCM9wf7Plyqv7p4-E6ROJ5Atv6IzFFA8dA6eEZWqF_SwOXJMEqyo3Gas7AzNoUSVear8d2sToLZFUv9lPXubp3_5kNN65Ri7bVQXJh0GqCBNN2ySWlO1ODaiIoNPSMOYpBLUaERRTh2AVzDLMvEcKQ5HQFLSqA1wFzABlOweF-7O1mvzdYLSmx8yCvlrIZxnBE2-c69IGmSJKowoczc2lNp96hNept6K-h94xQomC_bd8RajojBP928x-NLPhCH2bg98He0np_xBkm6M91z6M1ZnReZ7s45ViPOTovR6nW0QuqmH6LdF6JEeLc026DKLDX7Ap7fGjq-jFH-tbB_jp0wGGoJfTBLQllftTz9f86oqTXCf85_4fnMgTxB2qX_LBfJw4s6oa1Oex-EpBEprM4C0Awtlo9IkNNRBKLhxa7wPwMHFR_y9w7ZgEbq2pd-qDb4WMcDFfR5mTpCcYYrhufHSa0gnDDDAOanVSaFf58V5T_kKnb72_md7JFf87rhOoSjML_1Ks",
     *    "user": {
     *        "id": 2,
     *        "name": "Demo",
     *        "email": "demo@demo.com",
     *        "email_verified_at": null,
     *        "created_at": "2020-05-25T06:21:47.000000Z",
     *        "updated_at": "2020-05-25T06:21:47.000000Z"
     *    }
     * }
     * @response status=422 scenario="Validation error" {
     *    "message": "The given data was invalid.",
     *    "errors": {
     *        "email": [
     *            "The email field is required."
     *        ]
     *    }
     * }
     *
     * @param Request $request
     * @return Application|RedirectResponse|Response|Redirector
     */
    public function register(Request $request)
    {
        $this->validator($request->all())->validate();

        event(new Registered($user = $this->create($request->all())));

        $user
            ->roles()
            ->attach(Role::where('name', 'user')->first());

        $this->guard()->login($user);

        if ($response = $this->registered($request, $user)) {
            return $response;
        }

        return $request->wantsJson()
            ? new Response('', 201)
            : redirect($this->redirectPath());
    }

    /**
     * Get a validator for an incoming registration request.
     *
     * @param array $data
     * @return \Illuminate\Contracts\Validation\Validator
     */
    protected function validator(array $data)
    {
        return Validator::make($data, [
            'firstName' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
        ]);
    }

    /**
     * Create a new user instance after a valid registration.
     *
     * @param array $data
     * @return User
     */
    protected function create(array $data)
    {
        return User::create([
            'firstName' => $data['firstName'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
            'avatar'=>'data:image/jpeg;base64,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'
        ]);
    }

    /**
     * The user has been registered.
     *
     * @param Request $request
     * @param mixed $user
     * @return mixed
     */
    protected function registered(Request $request, $user)
    {
        return response()->json([
            'token' => $user->createToken($request->input('inneli_app'))->accessToken,
            'user' => $request->user()
        ]);
    }
}
