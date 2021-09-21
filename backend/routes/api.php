<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });
// header('Access-Control-Allow-Origin: *');
// header('Access-Control-Allow-Credentials: true');
// header('Access-Control-Allow-Methods:GET, POST, PUT, DELETE, OPTIONS');
// header('Access-Control-Allow-Headers:Origin, Content-Type, Accept, Authorization, X-Requested-With, x-xsrf-token');

Route::group(['prefix' => 'students'], function($router) {
    Route::get('/all', 'studentController@getAllStudents');
    Route::get('/getById/{id}', 'studentController@getStudentById');
    Route::post('/insert', 'studentController@insert');
    Route::post('/update', 'studentController@update');
    Route::post('/delete', 'studentController@delete');
});
