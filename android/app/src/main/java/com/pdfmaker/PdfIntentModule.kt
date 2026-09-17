package com.pdfmaker

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise
import com.facebook.react.modules.core.DeviceEventManagerModule

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

    companion object {
        var reactContextInstance: ReactApplicationContext? = null

        fun emitPdfIntent(uri: String) {
            reactContextInstance
                ?.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
                ?.emit("onPdfIntent", uri)
        }
    }

    init {
        reactContextInstance = reactContext
    }

    @ReactMethod
    fun addListener(eventName: String) {
        // Required for RN event emitter
    }

    @ReactMethod
    fun removeListeners(count: Int) {
        // Required for RN event emitter
    }
}