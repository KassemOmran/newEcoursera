<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\CourseController;
use App\Http\Controllers\API\EnrollmentController;
use App\Http\Controllers\API\LessonController;
use App\Http\Controllers\API\ProgressController;
use App\Http\Controllers\API\CertificateController;
use App\Http\Controllers\API\QuizController;

/*
|--------------------------------------------------------------------------
| Public Routes
|--------------------------------------------------------------------------
*/

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::get('/courses', [CourseController::class, 'index']);
Route::get('/courses/{id}', [CourseController::class, 'show']);

/*
|--------------------------------------------------------------------------
| Protected Routes (Sanctum)
|--------------------------------------------------------------------------
*/

Route::middleware('auth:sanctum')->group(function () {

    // Auth
    Route::get('/me', [AuthController::class, 'me']);
    Route::post('/logout', [AuthController::class, 'logout']);

    // Enrollment
    Route::post('/courses/{id}/enroll', [EnrollmentController::class, 'enroll']);
    Route::delete('/courses/{id}/enroll', [EnrollmentController::class, 'unenroll']);
    Route::get('/my-courses', [EnrollmentController::class, 'myCourses']);
    Route::get('/courses/{course}/status', [EnrollmentController::class, 'status']);

    // Progress
    Route::post('/lessons/{id}/complete', [ProgressController::class, 'completeLesson']);
    Route::get('/courses/{id}/progress', [ProgressController::class, 'courseProgress']);

    // Certificates
    Route::post('/courses/{id}/certificate', [CertificateController::class, 'generate']);
    Route::get('/my-certificates', [CertificateController::class, 'myCertificates']);

    // Instructor - Courses
    Route::get('/instructor/courses', [CourseController::class, 'myCourses']);
    Route::post('/instructor/courses', [CourseController::class, 'store']);
    Route::put('/instructor/courses/{id}', [CourseController::class, 'update']);
    Route::delete('/instructor/courses/{id}', [CourseController::class, 'destroy']);

    // Lessons
    Route::post('/courses/{id}/lessons', [LessonController::class, 'store']);
    Route::delete('/lessons/{lessonId}', [LessonController::class, 'destroy']);

    // Quizzes
    Route::post('/lessons/{id}/quiz', [QuizController::class, 'store']);
    Route::get('/lessons/{id}/quiz', [QuizController::class, 'show']);
    Route::delete('/lessons/{id}/quiz', [QuizController::class, 'destroy']);
    Route::post('/quizzes/{id}/submit', [QuizController::class,'submit']);
});
