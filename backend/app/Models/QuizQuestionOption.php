<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class QuizQuestionOption extends Model
{
    protected $fillable = ['question_id','option_text','is_correct'];
    public function quizQuestion(){
        return $this->belongsTo(QuizQuestion::class);
    }
}
