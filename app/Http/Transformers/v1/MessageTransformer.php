<?php

namespace IndieWise\Http\Transformers\v1;


use Cmgmyr\Messenger\Models\Message;
use League\Fractal\TransformerAbstract;

class MessageTransformer extends TransformerAbstract
{
    /**
     * List of resources to automatically include
     *
     * @var array
     */
    protected $availableIncludes = ['project', 'user'];

    /**
     * Turn this item object into a generic array
     *
     * @param Message $message
     * @return array
     */
    public function transform(Message $message)
    {
        return $message->toArray();
    }

}