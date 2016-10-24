<?php

namespace App\Http\Controllers\Api;


use Dingo\Api\Contract\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Http\Transformers\v1\RatingTransformer;
use App\Rating;
use App\Http\Requests\v1\RatingRequest;

class RatingsController extends Controller
{
    private $rating;

    public function __construct(Rating $rating)
    {
        $this->middleware('api.auth', ['only' => ['store', 'update', 'destroy']]);
        $this->rating = $rating;
    }

    /**
     * Display a listing of the resource.
     *
     * @param Request $request
     * @return \Illuminate\Http\Response
     * @internal param Rating $rating
     */
    public function index(Request $request)
    {
        $ratings = $this->rating->filter($request->all())->get();
        return response()->json(compact('ratings'));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\v1\RatingRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(RatingRequest $request)
    {
        $rating = Rating::create($request->all());
        return $this->response->item($rating, new RatingTransformer);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $rating = $this->rating->findOrFail($id);
        return $this->response->item($rating, new RatingTransformer);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $rating = $this->rating->where('id', $id)->where('author_id', $this->user()->id)->firstOrFail();
        $rating->update($request->all());
        return $this->response->item($rating, new RatingTransformer);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
