package com.pdfmaker

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise

class PdfIntentModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
    override fun getName(): String = "PdfIntentModule"

    @ReactMethod
    fun getPendingPdf(promise: Promise) {
        val uri = MainActivity.pendingPdfUri
        if (uri != null) {
            MainActivity.pendingPdfUri = null
            promise.resolve(uri)
        } else {
            promise.resolve(null)
        }
    }
}