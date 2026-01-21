<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: DejaVu Sans, sans-serif; text-align: center; }
        .certificate {
            border: 10px solid #4CAF50;
            padding: 50px;
            margin: 20px;
        }
        h1 { font-size: 40px; }
        p { font-size: 20px; }
    </style>
</head>
<body>
    <div class="certificate">
        <h1>Certificate of Completion</h1>
        <p>This certifies that</p>
        <h2>{{ $user->name }}</h2>
        <p>has successfully completed the course</p>
        <h3>{{ $course->title }}</h3>
        <p>Date: {{ now()->format('F j, Y') }}</p>
    </div>
</body>
</html>