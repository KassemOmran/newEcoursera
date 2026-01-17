<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Termwind\Question;

class Quiz extends Model
{
   protected $fillable = ['course_id'];

   public function course(){
    return $this->belongsTo(Course::class);
   }
   public function questions(){
    return $this->hasMany(QuizQuestion::class);
   }
}
