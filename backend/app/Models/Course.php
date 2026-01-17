<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Lesson;
class Course extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'title',
        'description',
        'thumbnail',
        'category',
        'price'
    ];

    public function lessons()
    {
        return $this->hasMany(Lesson::class);
    }
    public function enrollments()
{
    return $this->hasMany(Enrollment::class);
}

public function students()
{
    return $this->belongsToMany(
        User::class,
        'enrollments'
    );
}
public function instructor(){
    return $this->belongsTo(User::class,'user_id');
}
public function progresses()
{
    return $this->hasMany(Progress::class);
}
public function certificate()
{
    return $this->hasOne(Certificate::class);
}
public function quizzes()
{
    return $this->hasMany(Quiz::class);
}

}
