package com.lamnguyen1305.deliveryreactnativeapp.fragment

import android.animation.ValueAnimator
import android.os.Bundle
import android.view.View
import androidx.fragment.app.Fragment
import com.lamnguyen1305.deliveryreactnativeapp.R
import kotlin.math.cos

class CardVisaFragment : Fragment(R.layout.fragment_card_visa) {
    private var fmBeforeCardVisa: Fragment? = null;
    private var fmAfterCardVisa: Fragment? = null;
    private var animatorRotateFragment: ValueAnimator? = null;

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        FieldCard.CARD_NUMBER.forwardData()
        FieldCard.NAME.forwardData()
        FieldCard.EXPIRY_DATE.forwardData()
        FieldCard.CVV.forwardData()
        parentFragmentManager.apply {
            setFragmentResultListener(
                "${FieldCard.CVV.getName()}_focus",
                this@CardVisaFragment,
            ) { key: String, bundle: Bundle ->
                focusCvv(bundle.getBoolean("focus"))
                childFragmentManager.setFragmentResult(key, bundle)
            }
        }
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        this.init()
    }

    private fun init() {
        this.fmBeforeCardVisa = this.childFragmentManager.findFragmentById(R.id.fragment_before_card_visa)
        this.fmAfterCardVisa = this.childFragmentManager.findFragmentById(R.id.fragment_after_card_visa)
    }

    private fun focusCvv(focus: Boolean) {
        this.animatorRotateFragment?.removeAllUpdateListeners()
        if (focus) showAfterCard()
        else showBefore()
    }

    private fun showAfterCard() {
        this@CardVisaFragment.fmBeforeCardVisa?.view?.alpha = 1f
        this@CardVisaFragment.fmAfterCardVisa?.view?.alpha = 0f
        this.animatorRotateFragment = ValueAnimator.ofInt(this.view?.rotationY?.toInt() ?: 0, 180).apply {
            duration = 1000
            addUpdateListener {
                scaleXView(it.animatedValue)
                if (it.animatedValue as Int >= 90) {
                    this@CardVisaFragment.fmBeforeCardVisa?.view?.alpha = 0f
                    this@CardVisaFragment.fmAfterCardVisa?.view?.alpha = 1f
                }

            }
            start()
        }
    }

    private fun showBefore() {
        this@CardVisaFragment.fmBeforeCardVisa?.view?.alpha = 0f
        this@CardVisaFragment.fmAfterCardVisa?.view?.alpha = 1f
        this.animatorRotateFragment = ValueAnimator.ofInt(this.view?.rotationY?.toInt() ?: 180, 0).apply {
            duration = 1000
            addUpdateListener {
                scaleXView(it.animatedValue)
                this@CardVisaFragment.view?.rotationY = it.animatedValue as Int + 0f
                if (it.animatedValue as Int <= 90) {
                    this@CardVisaFragment.fmBeforeCardVisa?.view?.alpha = 1f
                    this@CardVisaFragment.fmAfterCardVisa?.view?.alpha = 0f
                }
            }
            start()
        }
    }

    private fun FieldCard.forwardData() {
        parentFragmentManager.apply {
            setFragmentResultListener(
                getName(),
                this@CardVisaFragment,
            ) { key: String, bundle: Bundle ->
                childFragmentManager.setFragmentResult(key, bundle)
            }

            setFragmentResultListener(
                "${getName()}_focus",
                this@CardVisaFragment,
            ) { key: String, bundle: Bundle ->
                childFragmentManager.setFragmentResult(key, bundle)
            }
        }
    }

    private fun scaleXView(value: Any) {
        this@CardVisaFragment.view?.rotationY = value as Int + 0f
        val cosValue = cos(Math.toRadians((value as Int).toDouble())).toFloat()
        this@CardVisaFragment.view?.apply {
            scaleX = if (cosValue >= 0) cosValue else -cosValue
            requestLayout()
        }
    }

    companion object {
        enum class FieldCard(private var field: String) {
            CARD_NUMBER("card_number"), NAME("name"), EXPIRY_DATE("expiry_date"), CVV("cvv");

            fun getName(): String {
                return this.field
            }
        }
    }
}
