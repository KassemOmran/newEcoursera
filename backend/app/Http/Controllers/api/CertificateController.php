<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Certificate;
use App\Models\Course;
use App\Models\Progress;
use Illuminate\Http\Request;

class CertificateController extends Controller
{
    public function generate(Request $request, $courseId)
    {
        $user = $request->user();

        $course = Course::findOrFail($courseId);

        $totalLessons = $course->lessons()->count();

        $completedLessons = Progress::where([
            'user_id' => $user->id,
            'course_id' => $courseId,
            'completed' => true,
        ])->count();

        if ($totalLessons === 0 || $completedLessons < $totalLessons) {
            return response()->json([
                'message' => 'Course not completed'
            ], 403);
        }

        $certificate = Certificate::firstOrCreate(
            [
                'user_id' => $user->id,
                'course_id' => $courseId,
            ],
            [
                'issued_at' => now(),
            ]
        );

        return response()->json([
            'message' => 'Certificate issued',
            'certificate' => $certificate,
        ], 201);
    }

    public function myCertificates(Request $request)
    {
        return response()->json(
            $request->user()->certificates()->with('course')->get()
        );
    }
}
