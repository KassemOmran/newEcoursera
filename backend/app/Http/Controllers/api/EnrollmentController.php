<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Enrollment;
use App\Models\Course;
use Illuminate\Http\Request;

class EnrollmentController extends Controller
{
    public function enroll(Request $request, $courseId)
    {
        $user = $request->user();

        $course = Course::findOrFail($courseId);

        // Prevent duplicate enrollment
        if ($user->enrolledCourses()->where('course_id', $courseId)->exists()) {
            return response()->json([
                'message' => 'Already enrolled'
            ], 409);
        }

        Enrollment::create([
            'user_id' => $user->id,
            'course_id' => $courseId,
        ]);

        return response()->json([
            'message' => 'Enrolled successfully'
        ], 201);
    }

    public function myCourses(Request $request)
    {
        return response()->json(
            $request->user()->enrolledCourses()->with('lessons')->get()
        );
    }
}
