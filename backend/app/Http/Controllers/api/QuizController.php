<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Course;
use App\Models\Quiz;
use Illuminate\Http\Request;
class QuizController extends Controller
{
    public function store(Request $request, $courseId)
    {
        $course = Course::where('user_id', auth()->id())->findOrFail($courseId);

        $quiz = Quiz::create([
            'course_id' => $course->id,
        ]);

        foreach ($request->questions as $index => $q) {
            $question = $quiz->questions()->create([
                'question_text' => $q['text'],
                'question_order' => $index + 1,
            ]);

            foreach ($q['options'] as $i => $opt) {
                $question->quizQuestionOptions()->create([
                    'option_text' => $opt,
                    'is_correct' => $i == $q['correct'],
                ]);
            }
        }

        return response()->json([
            'message' => 'Quiz created successfully',
            'quiz' => $quiz->load('questions.quizQuestionOptions')
        ], 201);
    }
}