<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Enrollment;
use App\Models\Course;
use App\Models\Progress;
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
        $user = $request->user();

        $courses = $user->enrolledCourses()->with('lessons')->get();

        $courses->transform(function ($course) use ($user) {
            $totalLessons = $course->lessons->count();

            $completedLessons = Progress::where([
                'user_id' => $user->id,
                'course_id' => $course->id,
                'completed' => true,
            ])->count();

            $course->progress = $totalLessons > 0
                ? round(($completedLessons / $totalLessons) * 100)
                : 0;

            return $course;
        });

        return response()->json($courses);
    }
    public function status(Request $request, $courseId)
    {
        $user = $request->user();

        $isEnrolled = $user->enrolledCourses()->where('course_id', $courseId)->exists();

        return response()->json([
            'enrolled' => $isEnrolled,
        ]);
    }
    public function unenroll(Request $request, $courseId)
{
    $user = $request->user();
    $course = Course::findOrFail($courseId);

    if (!$user->enrolledCourses()->where('course_id', $courseId)->exists()) {
        return response()->json([
            'message' => 'You are not enrolled in this course'
        ], 404);
    }

    // Remove enrollment record
    Enrollment::where('user_id', $user->id)
              ->where('course_id', $courseId)
              ->delete();

    // Optionally clear progress
    Progress::where('user_id', $user->id)
            ->where('course_id', $courseId)
            ->delete();

    return response()->json([
        'message' => 'Successfully unenrolled from course',
        'course_id' => $course->id,
    ]);
}

}
