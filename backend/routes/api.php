<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\CourseController;
use App\Http\Controllers\API\EnrollmentController;
use App\Http\Controllers\API\ProgressController;
use App\Http\Controllers\API\CertificateController;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {

    Route::get('/me', [AuthController::class, 'me']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/courses/{id}/enroll', [EnrollmentController::class, 'enroll']);
    Route::get('/my-courses', [EnrollmentController::class, 'myCourses']);
    Route::post('/courses', [CourseController::class, 'store']);
    Route::post('/lessons/{id}/complete', [ProgressController::class, 'completeLesson']);
    Route::get('/courses/{id}/progress', [ProgressController::class, 'courseProgress']);
    Route::post('/courses/{id}/certificate', [CertificateController::class, 'generate']);
    Route::get('/my-certificates', [CertificateController::class, 'myCertificates']);
});

Route::get('/courses', [CourseController::class, 'index']);
Route::get('/courses/{id}', [CourseController::class, 'show']);
