package com.lamnguyen1305.deliveryreactnativeapp.fragment

import android.animation.ValueAnimator
import android.os.Bundle
import android.view.View
import android.widget.TextView
import androidx.fragment.app.Fragment
import com.lamnguyen1305.deliveryreactnativeapp.R

class BeforeCardVisaFragment : Fragment(R.layout.fragment_before_card_visa) {
    private var cardNumber: String = ""
    private lateinit var tvPointInputName: TextView
    private lateinit var tvPointInputExpiryDate: TextView
    private lateinit var tvName: TextView
    private lateinit var tvExpiryDate: TextView
    private lateinit var tvNullExpiryDate: TextView
    private var animatorAlphaInput: ValueAnimator? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        CardVisaFragment.Companion.FieldCard.CARD_NUMBER.getData { inputCardNumber(it) }
        CardVisaFragment.Companion.FieldCard.CARD_NUMBER.getFocus {
            childFragmentManager.setFragmentResult("cell_${cardNumber.length}_focus", Bundle().apply {
                putBoolean("focus", it)
            })
        }
        CardVisaFragment.Companion.FieldCard.NAME.getData {
            runAnimatorInputName(false)
            this.tvName.text = it
            runAnimatorInputName(true)
        }
        CardVisaFragment.Companion.FieldCard.NAME.getFocus { runAnimatorInputName(it) }
        CardVisaFragment.Companion.FieldCard.EXPIRY_DATE.getData { inputExpiryDate(it) }
        CardVisaFragment.Companion.FieldCard.EXPIRY_DATE.getFocus { runAnimatorInputExpiryDate(it) }
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        this.init(view)
    }

    private fun init(view: View) {
        this.childFragmentManager.beginTransaction().apply {
            replace(R.id.cell_1, CellFragment.newInstance(0))
            replace(R.id.cell_2, CellFragment.newInstance(1))
            replace(R.id.cell_3, CellFragment.newInstance(2))
            replace(R.id.cell_4, CellFragment.newInstance(3))
            replace(R.id.cell_5, CellFragment.newInstance(4))
            replace(R.id.cell_6, CellFragment.newInstance(5))
            replace(R.id.cell_7, CellFragment.newInstance(6))
            replace(R.id.cell_8, CellFragment.newInstance(7))
            replace(R.id.cell_9, CellFragment.newInstance(8))
            replace(R.id.cell_10, CellFragment.newInstance(9))
            replace(R.id.cell_11, CellFragment.newInstance(10))
            replace(R.id.cell_12, CellFragment.newInstance(11))
            replace(R.id.cell_13, CellFragment.newInstance(12))
            replace(R.id.cell_14, CellFragment.newInstance(13))
            replace(R.id.cell_15, CellFragment.newInstance(14))
            replace(R.id.cell_16, CellFragment.newInstance(15))
        }.commitNow()
        this.tvPointInputName = view.findViewById(R.id.text_view_point_input_name)
        this.tvPointInputExpiryDate = view.findViewById(R.id.text_view_point_input_expiry_date)
        this.tvName = view.findViewById(R.id.text_view_name)
        this.tvExpiryDate = view.findViewById(R.id.text_view_expiry_date)
        this.tvNullExpiryDate = view.findViewById(R.id.text_view_null_expiry_date)
    }

    private fun inputCardNumber(text: String) {
        this.cardNumber = text
        text.split("").filter { it.isNotBlank() }.forEachIndexed { index, s ->
            sendCardNumber(index, s.toInt())
        }
        (text.length < 16).run {
            childFragmentManager.setFragmentResult("cell_${text.length}", Bundle().apply {
                putBoolean("focus", true)
            })
        }
        for (index in text.length + 1 until 16) {
            sendCardNumber(index, -1)
        }
    }

    private fun sendCardNumber(cellNumber: Int, number: Int) {
        this.childFragmentManager.setFragmentResult("cell_$cellNumber", Bundle().apply {
            putInt("number", number)
        })
    }

    private fun runAnimatorInput(focus: Boolean, view: View) {
        if (!focus) {
            this.animatorAlphaInput?.apply {
                removeAllUpdateListeners()
                view.alpha = 0f
            }
            return
        }

        view.alpha = 1f
        this.animatorAlphaInput = ValueAnimator.ofFloat(1f, 0f).apply {
            duration = 500
            repeatMode = ValueAnimator.REVERSE
            repeatCount = ValueAnimator.INFINITE
            addUpdateListener {
                view.alpha = it.animatedValue as Float
            }
            start()
        }
    }

    private fun inputExpiryDate(text: String) {
        if (text.length > 5) return
        this.tvPointInputExpiryDate.apply {
            runAnimatorInput(false, this)
            this@BeforeCardVisaFragment.tvExpiryDate.text = if (text.length == 2) "$text/" else text
            if (text.length < 5) {
                tvNullExpiryDate.text = "--/--".substring(text.length + 1)
                runAnimatorInput(true, this)
            }
        }
    }

    private fun runAnimatorInputExpiryDate(focus: Boolean) {
        if (this.tvExpiryDate.text.length >= 5) return
        tvPointInputExpiryDate.apply {
            runAnimatorInput(focus, this)
            if (focus) {
                this.text = "_"
                return@apply
            }
            this@BeforeCardVisaFragment.tvPointInputExpiryDate.apply {
                this.text = "-"
                this.alpha = 1f
            }

        }
    }

    private fun runAnimatorInputName(focus: Boolean) {
        runAnimatorInput(focus, tvPointInputName)
        if ((!focus).and(tvName.text.isEmpty())) {
            tvPointInputName.alpha = 1f
        }
    }

    private fun CardVisaFragment.Companion.FieldCard.getData(callBack: (data: String) -> Unit) {
        this@BeforeCardVisaFragment.parentFragmentManager.apply {
            setFragmentResultListener(
                getName(),
                this@BeforeCardVisaFragment
            ) { _: String, bundle: Bundle ->
                bundle.getString("data")
                    ?.let { callBack(it) }
            }
        }
    }

    private fun CardVisaFragment.Companion.FieldCard.getFocus(callBack: (focus: Boolean) -> Unit) {
        this@BeforeCardVisaFragment.parentFragmentManager.apply {
            setFragmentResultListener(
                "${getName()}_focus",
                this@BeforeCardVisaFragment
            ) { _: String, bundle: Bundle ->
                callBack(bundle.getBoolean("focus"))
            }
        }
    }
}
