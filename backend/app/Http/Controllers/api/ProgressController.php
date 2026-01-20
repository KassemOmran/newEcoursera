<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Lesson;
use App\Models\Progress;
use App\Models\Course;
use Illuminate\Http\Request;

class ProgressController extends Controller
{
    // Mark lesson as completed
    public function completeLesson(Request $request, $lessonId)
    {
        $user = $request->user();
        $lesson = Lesson::findOrFail($lessonId);

        Progress::updateOrCreate(
            [
                'user_id' => $user->id,
                'lesson_id' => $lesson->id,
            ],
            [
                'course_id' => $lesson->course_id,
                'completed' => true,
            ]
        );

        return response()->json([
            'message' => 'Lesson completed'
        ]);
    }

    // Get course progress details
    public function courseProgress(Request $request, $courseId)
    {
        $user = $request->user();

        // Check if user is enrolled in this course
        $course = $user->enrolledCourses()
            ->where('courses.id', $courseId)
            ->first();

        if (!$course) {
            return response()->json([
                'enrolled' => false,
                'progress' => 0,
                'completed_lessons' => [],
                'total_lessons' => 0
            ]);
        }

        $totalLessons = $course->lessons()->count();

        $completedLessons = Progress::where([
            'user_id' => $user->id,
            'course_id' => $courseId,
            'completed' => true,
        ])->pluck('lesson_id'); 

        $percentage = $totalLessons > 0
            ? round(($completedLessons->count() / $totalLessons) * 100)
            : 0;

        return response()->json([
            'enrolled' => true,
            'progress' => $percentage,
            'completed_lessons' => $completedLessons,
            'total_lessons' => $totalLessons,
        ]);
    }
}