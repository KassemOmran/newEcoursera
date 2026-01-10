<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Lesson;
use App\Models\Progress;
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

    // Get course progress %
    public function courseProgress(Request $request, $courseId)
    {
        $user = $request->user();

        $totalLessons = $user->enrolledCourses()
            ->where('courses.id', $courseId)
            ->first()
            ?->lessons()
            ->count() ?? 0;

        if ($totalLessons === 0) {
            return response()->json(['progress' => 0]);
        }

        $completedLessons = Progress::where([
            'user_id' => $user->id,
            'course_id' => $courseId,
            'completed' => true,
        ])->count();

        $percentage = round(($completedLessons / $totalLessons) * 100);

        return response()->json([
            'progress' => $percentage
        ]);
    }
}
