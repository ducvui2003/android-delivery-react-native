// replace with your package
package com.lamnguyen1305.deliveryreactnativeapp.view_manager;

import android.view.Choreographer
import android.view.View
import android.view.ViewGroup
import android.widget.FrameLayout
import androidx.fragment.app.FragmentActivity
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.ViewGroupManager
import com.facebook.react.uimanager.annotations.ReactPropGroup
import com.lamnguyen1305.deliveryreactnativeapp.fragment.CardVisaFragment
import com.lamnguyen1305.deliveryreactnativeapp.utils.toDp
import android.os.Bundle
import android.widget.Toast

class CardVisaViewManager(
    private val reactContext: ReactApplicationContext
) : ViewGroupManager<FrameLayout>() {
    private var propWidth: Int? = null
    private var propHeight: Int? = null
    private lateinit var activity: FragmentActivity;

    override fun getName() = REACT_CLASS

    /**
     * Return a FrameLayout which will later hold the Fragment
     */
    override fun createViewInstance(reactContext: ThemedReactContext) =
        FrameLayout(reactContext)

    /**
     * Map the "create" command to an integer
     */
    override fun getCommandsMap() = mapOf(
        "create" to COMMAND_CREATE,
        "sendDataCardNumber" to COMMAND_SEND_DATA_CARD_NUMBER,
        "sendFocusCardNumber" to COMMAND_SEND_FOCUS_CARD_NUMBER,
        "sendDataName" to COMMAND_SEND_DATA_NAME,
        "sendFocusName" to COMMAND_SEND_FOCUS_NAME,
        "sendDataExpiryDate" to COMMAND_SEND_DATA_EXPIRY_DATE,
        "sendFocusExpiryDate" to COMMAND_SEND_FOCUS_EXPIRY_DATE,
        "sendDataCvv" to COMMAND_SEND_DATA_CVV,
    )

    /**
     * Handle "create" command (called from JS) and call createFragment method
     */
    override fun receiveCommand(
        root: FrameLayout,
        commandId: String,
        args: ReadableArray?
    ) {
        super.receiveCommand(root, commandId, args)
        if (commandId.toInt() == COMMAND_CREATE) {
            val reactNativeViewId = requireNotNull(args).getInt(0)
            createFragment(root, reactNativeViewId)
            return;
        }

        if (commandId.toInt() % 2 == 0) {
            val data = requireNotNull(args).getString(0)
            when (commandId.toInt()) {
                COMMAND_SEND_DATA_CARD_NUMBER -> CardVisaFragment.Companion.FieldCard.CARD_NUMBER.sendData(data)
                COMMAND_SEND_DATA_NAME -> CardVisaFragment.Companion.FieldCard.NAME.sendData(data)
                COMMAND_SEND_DATA_EXPIRY_DATE -> CardVisaFragment.Companion.FieldCard.EXPIRY_DATE.sendData(data)
                COMMAND_SEND_DATA_CVV -> CardVisaFragment.Companion.FieldCard.CVV.sendData(data)
            }
        }
        else {
            val focus = requireNotNull(args).getBoolean(0)
            when (commandId.toInt()) {
                COMMAND_SEND_FOCUS_CARD_NUMBER -> CardVisaFragment.Companion.FieldCard.CARD_NUMBER.sendFocus(focus)
                COMMAND_SEND_FOCUS_NAME -> CardVisaFragment.Companion.FieldCard.NAME.sendFocus(focus)
                COMMAND_SEND_FOCUS_EXPIRY_DATE -> CardVisaFragment.Companion.FieldCard.EXPIRY_DATE.sendFocus(focus)
                COMMAND_SEND_FOCUS_CVV -> CardVisaFragment.Companion.FieldCard.CVV.sendFocus(focus)
            }
        }
    }

    @ReactPropGroup(names = ["width", "height"], customType = "Style")
    fun setStyle(view: FrameLayout, index: Int, value: Int) {
        if (index == 0) propWidth = value.toDp()
        if (index == 1) propHeight = value.toDp()
    }

    /**
     * Replace your React Native view with a custom fragment
     */
    fun createFragment(root: FrameLayout, reactNativeViewId: Int) {
        val parentView = root.findViewById<ViewGroup>(reactNativeViewId)
        setupLayout(parentView)

        val myFragment = CardVisaFragment()
        this.activity = reactContext.currentActivity as FragmentActivity
        activity.supportFragmentManager
            .beginTransaction()
            .replace(reactNativeViewId, myFragment, reactNativeViewId.toString())
            .commit()
    }

    private fun CardVisaFragment.Companion.FieldCard.sendData(data: String) {
        this@CardVisaViewManager.activity.supportFragmentManager.setFragmentResult(getName(), Bundle().apply {
            putString("data", data)
        })
    }

    private fun CardVisaFragment.Companion.FieldCard.sendFocus(focus: Boolean) {
        this@CardVisaViewManager.activity.supportFragmentManager.setFragmentResult("${getName()}_focus", Bundle().apply {
            putBoolean("focus", focus)
        })
    }

    fun setupLayout(view: View) {
        Choreographer.getInstance().postFrameCallback(object : Choreographer.FrameCallback {
            override fun doFrame(frameTimeNanos: Long) {
                manuallyLayoutChildren(view)
                view.viewTreeObserver.dispatchOnGlobalLayout()
                Choreographer.getInstance().postFrameCallback(this)
            }
        })
    }

    /**
     * Layout all children properly
     */
    private fun manuallyLayoutChildren(view: View) {
        // propWidth and propHeight coming from react-native props
        val width = requireNotNull(propWidth)
        val height = requireNotNull(propHeight)

        view.measure(
            View.MeasureSpec.makeMeasureSpec(width, View.MeasureSpec.EXACTLY),
            View.MeasureSpec.makeMeasureSpec(height, View.MeasureSpec.EXACTLY)
        )

        view.layout(0, 0, width, height)
    }

    companion object {
        private const val REACT_CLASS = "CardVisaViewManager"
        private const val COMMAND_CREATE = 1
        private const val COMMAND_SEND_DATA_CARD_NUMBER = 2
        private const val COMMAND_SEND_FOCUS_CARD_NUMBER = 3
        private const val COMMAND_SEND_DATA_NAME = 4
        private const val COMMAND_SEND_FOCUS_NAME = 5
        private const val COMMAND_SEND_DATA_EXPIRY_DATE = 6
        private const val COMMAND_SEND_FOCUS_EXPIRY_DATE = 7
        private const val COMMAND_SEND_DATA_CVV = 8
        private const val COMMAND_SEND_FOCUS_CVV = 9
    }
}
