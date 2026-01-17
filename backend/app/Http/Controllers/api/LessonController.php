<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Lesson;
use App\Models\Course;
use Illuminate\Http\Request;

class LessonController extends Controller
{
    // CREATE LESSON
    public function store(Request $request, $courseId)
{
    $course = Course::where('user_id', auth()->id())->findOrFail($courseId);

    $request->validate([
        'title' => 'required|string|max:255',
        'video' => 'required|url',
    ]);

    // Find the next order number
    $nextOrder = $course->lessons()->max('order') + 1;

    $lesson = $course->lessons()->create([
        'title' => $request->title,
        'video' => $request->video,
        'order' => $nextOrder,
    ]);

    return response()->json([
        'message' => 'Lesson created successfully',
        'lesson' => $lesson
    ], 201);
}

    // READ LESSONS FOR A COURSE
    public function index($courseId)
    {
        $course = Course::where('user_id', auth()->id())->findOrFail($courseId);

        return response()->json($course->lessons);
    }

    // UPDATE LESSON
    public function update(Request $request, $courseId, $lessonId)
    {
        $course = Course::where('user_id', auth()->id())->findOrFail($courseId);
        $lesson = $course->lessons()->findOrFail($lessonId);

        $request->validate([
            'title' => 'sometimes|string|max:255',
            'video' => 'sometimes|url',
        ]);

        $lesson->update($request->all());

        return response()->json([
            'message' => 'Lesson updated successfully',
            'lesson' => $lesson
        ]);
    }

    // DELETE LESSON
    public function destroy($courseId, $lessonId)
    {
        $course = Course::where('user_id', auth()->id())->findOrFail($courseId);
        $lesson = $course->lessons()->findOrFail($lessonId);

        $lesson->delete();

        return response()->json([
            'message' => 'Lesson deleted successfully'
        ]);
    }
}